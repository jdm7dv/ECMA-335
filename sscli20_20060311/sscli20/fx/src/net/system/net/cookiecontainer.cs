//------------------------------------------------------------------------------
// <copyright file="cookiecontainer.cs" company="Microsoft">
//     
//      Copyright (c) 2006 Microsoft Corporation.  All rights reserved.
//     
//      The use and distribution terms for this software are contained in the file
//      named license.txt, which can be found in the root of this distribution.
//      By using this software in any fashion, you are agreeing to be bound by the
//      terms of this license.
//     
//      You must not remove this notice, or any other, from this software.
//     
// </copyright>
//------------------------------------------------------------------------------

namespace System.Net {

    using System.Collections;
    using System.Threading;
    using System.Globalization;
    using System.Net.NetworkInformation;

    internal struct HeaderVariantInfo {

        string m_name;
        CookieVariant m_variant;

        internal HeaderVariantInfo(string name, CookieVariant variant) {
            m_name = name;
            m_variant = variant;
        }

        internal string Name {
            get {
                return m_name;
            }
        }

        internal CookieVariant Variant {
            get {
                return m_variant;
            }
        }
    }

    //
    // CookieContainer
    //
    //  Manage cookies for a user (implicit). Based on RFC 2965
    //

    /// <devdoc>
    ///    <para>[To be supplied.]</para>
    /// </devdoc>
    [Serializable]
    public class CookieContainer {

        public const int DefaultCookieLimit = 300;
        public const int DefaultPerDomainCookieLimit = 20;
        public const int DefaultCookieLengthLimit = 4096;

        static readonly HeaderVariantInfo [] HeaderInfo = {
            new HeaderVariantInfo(HttpKnownHeaderNames.SetCookie,  CookieVariant.Rfc2109),
            new HeaderVariantInfo(HttpKnownHeaderNames.SetCookie2, CookieVariant.Rfc2965)
        };

    // fields

        Hashtable m_domainTable = new Hashtable();
        int m_maxCookieSize = DefaultCookieLengthLimit;
        int m_maxCookies = DefaultCookieLimit;
        int m_maxCookiesPerDomain = DefaultPerDomainCookieLimit;
        int m_count = 0;
        string  m_fqdnMyDomain = String.Empty;

    // constructors

        /// <devdoc>
        ///    <para>[To be supplied.]</para>
        /// </devdoc>
        public CookieContainer() {
            string domain = IPGlobalProperties.InternalGetIPGlobalProperties().DomainName;
            if (domain != null && domain.Length > 1)
            {
                m_fqdnMyDomain = '.' + domain;
            }
            //Otherwise it will remain string.Empty
        }

        /// <devdoc>
        ///    <para>[To be supplied.]</para>
        /// </devdoc>
        public CookieContainer(int capacity) : this(){
            if (capacity <= 0) {
                throw new ArgumentException(SR.GetString(SR.net_toosmall), "Capacity");
            }
            m_maxCookies = capacity;
        }

        /// <devdoc>
        ///    <para>[To be supplied.]</para>
        /// </devdoc>
        public CookieContainer(int capacity, int perDomainCapacity, int maxCookieSize) : this(capacity) {
            if (perDomainCapacity != Int32.MaxValue && (perDomainCapacity <= 0 || perDomainCapacity > capacity)) {
                throw new ArgumentOutOfRangeException("perDomainCapacity", SR.GetString(SR.net_cookie_capacity_range, "PerDomainCapacity", 0, capacity));
            }
            m_maxCookiesPerDomain = perDomainCapacity;
            if (maxCookieSize <= 0) {
                throw new ArgumentException(SR.GetString(SR.net_toosmall), "MaxCookieSize");
            }
            m_maxCookieSize = maxCookieSize;
        }

    // properties

        /// <devdoc>
        ///    <para>Note that after shrinking the capacity Count can become greater than Capacity.</para>
        /// </devdoc>
        public int Capacity {
            get {
                return m_maxCookies;
            }
            set {
                if (value <= 0 || (value < m_maxCookiesPerDomain && m_maxCookiesPerDomain != Int32.MaxValue)) {
                    throw new ArgumentOutOfRangeException("value", SR.GetString(SR.net_cookie_capacity_range, "Capacity", 0, m_maxCookiesPerDomain));
                }
                if (value < m_maxCookies) {
                    m_maxCookies = value;
                    AgeCookies(null);
                }
                m_maxCookies = value;
            }
        }

        /// <devdoc>
        ///    <para>returns the total number of cookies in the container.</para>
        /// </devdoc>
        public int Count {
            get {
                return m_count;
            }
        }

        /// <devdoc>
        ///    <para>[To be supplied.]</para>
        /// </devdoc>
        public int MaxCookieSize {
            get {
                return m_maxCookieSize;
            }
            set {
                if (value <= 0) {
                    throw new ArgumentOutOfRangeException("value");
                }
                m_maxCookieSize = value;
            }
        }

        /// <devdoc>
        ///    <para>After shrinking domain capacity each domain will less hold than new domain capacity</para>
        /// </devdoc>
        public int PerDomainCapacity {
            get {
                return m_maxCookiesPerDomain;
            }
            set {
                if (value <= 0 || (value > m_maxCookies && value != Int32.MaxValue)) {
                    throw new ArgumentOutOfRangeException("value");
                }
                if (value < m_maxCookiesPerDomain) {
                    m_maxCookiesPerDomain = value;
                    AgeCookies(null);
                }
                m_maxCookiesPerDomain = value;
            }
        }

    // methods

        /// <devdoc>
        ///    <para>[To be supplied.]</para>
        /// </devdoc>

        //This method will construct faked URI, Domain property is required for param.
        public void Add(Cookie cookie) {
            if (cookie == null) {
                throw new ArgumentNullException("cookie");
            }

            if (cookie.Domain.Length == 0) {
                throw new ArgumentException(SR.GetString(SR.net_emptystringcall), "cookie.Domain");
            }

            // We don't know cookie verification status -> re-create cookie and verify it
            Cookie new_cookie = new Cookie(cookie.Name, cookie.Value);
            Uri uri;

            new_cookie.Version = cookie.Version;

            // We cannot add an invalid cookie into the container.
            // Trying to prepare Uri for the cookie verification
            string uriStr = (cookie.Secure ? Uri.UriSchemeHttps : Uri.UriSchemeHttp) + Uri.SchemeDelimiter ;

            if (cookie.Domain[0] == '.') {
                uriStr += "0";                      // Uri cctor should eat this, faked host.
                new_cookie.Domain = cookie.Domain;  // Otherwise keep Domain as implicitly set
            }
            uriStr += cookie.Domain;


            // Either keep Port as implici or set it according to original cookie
            if (cookie.PortList != null) {
                new_cookie.Port = cookie.Port;
                uriStr += ":"+ cookie.PortList[0];
            }

            // Path must be present, set to root by default
            new_cookie.Path = cookie.Path.Length == 0 ? "/" : cookie.Path;
            uriStr += cookie.Path;

            if(!Uri.TryCreate(uriStr, UriKind.Absolute, out uri))
                throw new CookieException(SR.GetString(SR.net_cookie_attribute, "Domain", cookie.Domain));

            new_cookie.VerifySetDefaults(CookieVariant.Unknown, uri, IsLocal(uri.Host), m_fqdnMyDomain, true, true);

            Add(new_cookie, true);
        }

        private void AddRemoveDomain(string key, PathList value) {
            // Hashtable support multiple readers ans one writer
            // Synchronize writers (make them to be just one)
            lock(this) {
                if (value == null) {
                    m_domainTable.Remove(key);
                }
                else {
                    m_domainTable[key] = value;
                }
            }
        }

        // This method is called *only* when cookie verification is done,
        // so unlike with public Add(Cookie cookie) the cookie is in sane condition
        internal void Add(Cookie cookie, bool throwOnError) {

            PathList pathList;

            if (cookie.Value.Length > m_maxCookieSize) {
                if (throwOnError) {
                    throw new CookieException(SR.GetString(SR.net_cookie_size, cookie.ToString(), m_maxCookieSize));
                }
                return;
            }

            try {

                pathList = (PathList)m_domainTable[cookie.DomainKey];
                if (pathList == null) {
                    pathList = new PathList();
                    AddRemoveDomain(cookie.DomainKey, pathList);
                }
                int domain_count = pathList.GetCookiesCount();

                CookieCollection cookies = (CookieCollection)pathList[cookie.Path];

                if (cookies == null) {
                    cookies = new CookieCollection();
                    pathList[cookie.Path] = cookies;
                }

                if(cookie.Expired) {
                    //Explicit removal command (Max-Age == 0)
                    lock (cookies) {
                        int idx = cookies.IndexOf(cookie);
                        if (idx != -1) {
                            cookies.RemoveAt(idx);
                            --m_count;
                        }
                    }
                }
                else {
                    //This is about real cookie adding, check Capacity first
                    if (domain_count >= m_maxCookiesPerDomain && !AgeCookies(cookie.DomainKey)) {
                            return; //cannot age -> reject new cookie
                    }
                    else if (this.m_count >= m_maxCookies && !AgeCookies(null)) {
                            return; //cannot age -> reject new cookie
                    }

                    //about to change the collection
                    lock (cookies) {
                        m_count += cookies.InternalAdd(cookie, true);
                    }
                }
            }
            catch (Exception e) {
                if (e is ThreadAbortException || e is StackOverflowException || e is OutOfMemoryException) {
                    throw;
                }

                if (throwOnError) {
                    throw new CookieException(SR.GetString(SR.net_container_add_cookie), e);
                }
            }
            catch {
                if (throwOnError) {
                    throw new CookieException(SR.GetString(SR.net_container_add_cookie), new Exception(SR.GetString(SR.net_nonClsCompliantException)));
                }
            }
        }

        //
        // This function, once called, must delete at least one cookie
        // If there are expired cookies in given scope they are cleaned up
        // If nothing found the least used Collection will be found and removed
        // from the container.
        //
        // Also note that expired cookies are also removed during request preparation
        // (this.GetCookies method)
        //
        // Param. 'domain' == null means to age in the whole container
        //
        private bool AgeCookies(string domain) {

            // border case => shrinked to zero
            if(m_maxCookies == 0 || m_maxCookiesPerDomain == 0) {
                m_domainTable = new Hashtable();
                m_count = 0;
                return false;
            }

            int      removed = 0;
            DateTime oldUsed = DateTime.MaxValue;
            DateTime tempUsed;

            CookieCollection lruCc = null;
            string   lruDomain =  null;
            string   tempDomain = null;

            PathList pathList;
            int domain_count = 0;
            int itemp = 0;
            float remainingFraction = 1.0F;

            // the container was shrinked, might need additional cleanup for each domain
            if (m_count > m_maxCookies) {
                // Means the fraction of the container to be left
                // Each domain will be cut accordingly
                remainingFraction = (float)m_maxCookies/(float)m_count;

            }

            foreach (DictionaryEntry entry in m_domainTable) {
                if (domain == null) {
                    tempDomain = (string) entry.Key;
                    pathList = (PathList) entry.Value;          //aliasing to trick foreach
                }
                else {
                    tempDomain = domain;
                    pathList = (PathList) m_domainTable[domain];
                }

                domain_count = 0;                             // cookies in the domain
                foreach (CookieCollection cc in pathList.Values) {
                    itemp = ExpireCollection(cc);
                    removed += itemp;
                    m_count -= itemp;                      //update this container count;
                    domain_count += cc.Count;
                    // we also find the least used cookie collection in ENTIRE container
                    // we count the collection as LRU only if it holds 1+ elements
                    if (cc.Count > 0 && (tempUsed = cc.TimeStamp(CookieCollection.Stamp.Check)) < oldUsed) {
                        lruDomain = tempDomain;
                        lruCc = cc;
                        oldUsed = tempUsed;
                    }
                }

                // Check if we have reduced to the limit of the domain by expiration only
                int min_count = Math.Min((int)(domain_count*remainingFraction), Math.Min(m_maxCookiesPerDomain, m_maxCookies)-1);
                if (domain_count > min_count) {
                    //That case require sorting all domain collections by timestamp
                    Array cookies = Array.CreateInstance(typeof(CookieCollection), pathList.Count);
                    Array stamps  = Array.CreateInstance(typeof(DateTime), pathList.Count);
                    foreach (CookieCollection cc in pathList.Values) {
                        stamps.SetValue(cc.TimeStamp(CookieCollection.Stamp.Check), itemp);
                        cookies.SetValue(cc ,itemp );
                        ++itemp ;
                    }
                    Array.Sort(stamps, cookies);

                    itemp = 0;
                    for (int i = 0; i < pathList.Count; ++i) {
                        CookieCollection cc = (CookieCollection)cookies.GetValue(i);

                        lock (cc) {
                            while (domain_count > min_count && cc.Count > 0) {
                                cc.RemoveAt(0);
                                --domain_count;
                                --m_count;
                                ++removed;
                            }
                        }
                        if (domain_count <= min_count ) {
                            break;
                        }
                    }

                    if (domain_count > min_count && domain != null) {
                        //cannot complete aging of explicit domain (no cookie adding allowed)
                        return false;
                    }
                }

                // we have completed aging of specific domain
                if (domain != null) {
                    return true;
                }

            }

            //  The rest is  for entire container aging
            //  We must get at least one free slot.

            //Don't need to appy LRU if we already cleaned something
            if (removed != 0) {
                return true;
            }

            if (oldUsed == DateTime.MaxValue) {
            //Something strange. Either capacity is 0 or all collections are locked with cc.Used
                return false;
            }

            // Remove oldest cookies from the least used collection
            lock (lruCc) {
                while (m_count >= m_maxCookies && lruCc.Count > 0) {
                    lruCc.RemoveAt(0);
                    --m_count;
                }
            }
            return true;
        }

        //return number of cookies removed from the collection
        private int ExpireCollection(CookieCollection cc) {
            int oldCount = cc.Count;
            int idx = oldCount-1;

            // minor optimization by caching Now
            DateTime now = DateTime.Now;

            lock (cc) {
                //Cannot use enumerator as we are going to alter collection
                while (idx >= 0) {
                    Cookie cookie = cc[idx];
                    if (cookie.Expires <= now && cookie.Expires != DateTime.MinValue) {

                        cc.RemoveAt(idx);
                    }
                    --idx;
                }
            }
            return oldCount - cc.Count;
        }



        public void Add(CookieCollection cookies) {
            if (cookies == null) {
                throw new ArgumentNullException("cookies");
            }
            foreach (Cookie c in cookies) {
                Add(c);
            }
        }

        //
        // This will try (if needed) get the full domain name of the host given the Uri
        // NEVER call this function from internal methods with 'fqdnRemote' == NULL
        // Since this method counts security issue for DNS and hence will slow
        // the performance
        //
        internal bool IsLocal(string host) {

            int dot = host.IndexOf('.');
            if (dot == -1) {
                // No choice but to treat it as a host on the local domain
                // This also covers 'localhost' and 'loopback'
                return true;
            }

            // quick test for usual case
            if (host == "127.0.0.1")
            {
                return true;
            }

            // test domain membership
            if (string.Compare(m_fqdnMyDomain, 0, host, dot, m_fqdnMyDomain.Length, StringComparison.OrdinalIgnoreCase ) == 0)
            {
                return true;
            }

            // test for "127.###.###.###" without using regex
            string[] ipParts = host.Split('.');
            if (ipParts != null && ipParts.Length == 4 && ipParts[0] == "127")
            {
                int i;
                for (i = 1; i < 4; i++)
                {
                    switch (ipParts[i].Length)
                    {
                        case 3:
                            if (ipParts[i][2] < '0' || ipParts[i][2] > '9')
                            {
                                break;
                            }
                            goto case 2;

                        case 2:
                            if (ipParts[i][1] < '0' || ipParts[i][1] > '9')
                            {
                                break;
                            }
                            goto case 1;

                        case 1:
                            if (ipParts[i][0] < '0' || ipParts[i][0] > '9')
                            {
                                break;
                            }
                            continue;
                    }
                    break;
                }
                if (i == 4)
                {
                    return true;
                }
            }

            return false;
        }

        /// <devdoc>
        ///    <para>[To be supplied.]</para>
        /// </devdoc>
        public void Add(Uri uri, Cookie cookie) {
            if (uri == null) {
                throw new ArgumentNullException("uri");
            }
            if(cookie == null) {
                throw new ArgumentNullException("cookie");
            }
            cookie.VerifySetDefaults(CookieVariant.Unknown, uri, IsLocal(uri.Host), m_fqdnMyDomain, true, true);

            Add(cookie, true);
        }

        /// <devdoc>
        ///    <para>[To be supplied.]</para>
        /// </devdoc>

        public void Add(Uri uri, CookieCollection cookies) {
            if (uri == null) {
                throw new ArgumentNullException("uri");
            }
            if(cookies == null) {
                throw new ArgumentNullException("cookies");
            }
            bool isLocalDomain = IsLocal(uri.Host);
            foreach (Cookie c in cookies) {
                c.VerifySetDefaults(CookieVariant.Unknown, uri, isLocalDomain, m_fqdnMyDomain, true, true);
                Add(c, true);
            }
        }

        internal CookieCollection CookieCutter(Uri uri, string headerName, string setCookieHeader, bool isThrow) {
            GlobalLog.Print("CookieContainer#" + ValidationHelper.HashString(this) + "::CookieCutter() uri:" + uri + " headerName:" + headerName + " setCookieHeader:" + setCookieHeader + " isThrow:" + isThrow);
            CookieCollection cookies = new CookieCollection();
            CookieVariant variant = CookieVariant.Unknown;
            if (headerName == null) {
                variant = CookieVariant.Default;
            }
            else for (int i = 0; i < HeaderInfo.Length; ++i) {
                if ((String.Compare(headerName, HeaderInfo[i].Name, StringComparison.OrdinalIgnoreCase ) == 0)) {
                    variant  = HeaderInfo[i].Variant;
                }
            }
            bool isLocalDomain = IsLocal(uri.Host);
            try {
                CookieParser parser = new CookieParser(setCookieHeader);
                do {
                    Cookie cookie = parser.Get();
                    GlobalLog.Print("CookieContainer#" + ValidationHelper.HashString(this) + "::CookieCutter() CookieParser returned cookie:" + ValidationHelper.ToString(cookie));
                    if (cookie == null) {
                        break;
                    }

                    //Parser marks invalid cookies this way
                    if (ValidationHelper.IsBlankString(cookie.Name)) {
                        if(isThrow) {
                            throw new CookieException(SR.GetString(SR.net_cookie_format));
                        }
                        //Otherwise, ignore (reject) cookie
                        continue;
                    }

                    // this will set the default values from the response URI
                    // AND will check for cookie validity
                    if(!cookie.VerifySetDefaults(variant, uri, isLocalDomain, m_fqdnMyDomain, true, isThrow)) {
                        continue;
                    }
                    // If many same cookies arrive we collapse them into just one, hence setting
                    // parameter isStrict = true below
                    cookies.InternalAdd(cookie, true);

                } while (true);
            }
            catch (Exception e) {
                if (e is ThreadAbortException || e is StackOverflowException || e is OutOfMemoryException) {
                    throw;
                }

                if(isThrow) {
                    throw new CookieException(SR.GetString(SR.net_cookie_parse_header, uri.AbsoluteUri), e);
                }
            }
            catch {
                if(isThrow) {
                    throw new CookieException(SR.GetString(SR.net_cookie_parse_header, uri.AbsoluteUri), new Exception(SR.GetString(SR.net_nonClsCompliantException)));
                }
            }

            foreach (Cookie c in cookies) {
                Add(c, isThrow);
            }

            return cookies;
        }

        /// <devdoc>
        ///    <para>[To be supplied.]</para>
        /// </devdoc>
        public CookieCollection GetCookies(Uri uri) {
            if (uri == null) {
                throw new ArgumentNullException("uri");
            }
            return InternalGetCookies(uri);
        }

        internal CookieCollection InternalGetCookies(Uri uri) {

            bool isSecure = (uri.Scheme == Uri.UriSchemeHttps);
            int  port = uri.Port;
            CookieCollection cookies = new CookieCollection();
            ArrayList nameKeys = new ArrayList();
            int firstCompatibleVersion0SpecKey = 0;

            string fqdnRemote = uri.Host;

            int dot = fqdnRemote.IndexOf('.');
            if (dot == -1) {
                // DNS.resolve may return short names even for other inet domains ;-(
                // We _don't_ know what the exact domain is, so try also grab short hostname cookies.
                nameKeys.Add(fqdnRemote);
                // grab long name from the local domain
                if (m_fqdnMyDomain != null && m_fqdnMyDomain.Length != 0) {
                    nameKeys.Add(fqdnRemote + m_fqdnMyDomain);
                    // grab the local domain itself
                    nameKeys.Add(m_fqdnMyDomain);
                    firstCompatibleVersion0SpecKey = 3;
                }
                else {
                    firstCompatibleVersion0SpecKey = 1;
                }
            }
            else {
                // grab the host itself
                nameKeys.Add(fqdnRemote);
                // grab the host domain
                nameKeys.Add(fqdnRemote.Substring(dot));
                firstCompatibleVersion0SpecKey = 2;
                // The following block is only for compatibility with Version0 spec.
                // Still, we'll add only Plain-Variant cookies if found under below keys
                if (fqdnRemote.Length > 2) {
                    // We ignore the '.' at the end on the name
                    int last = fqdnRemote.LastIndexOf('.', fqdnRemote.Length-2);
                    //AND keys with <2 dots inside.
                    if (last > 0) {
                        last = fqdnRemote.LastIndexOf('.', last-1);
                    }
                    if (last != -1) {
                        while ((dot < last) && (dot = fqdnRemote.IndexOf('.', dot+1)) != -1) {
                            nameKeys.Add(fqdnRemote.Substring(dot));
                        }
                    }
                }
            }

            foreach (string key in nameKeys) {
            bool found = false;
            bool defaultAdded = false;
            PathList pathList = (PathList)m_domainTable[key];
            --firstCompatibleVersion0SpecKey;

                if (pathList == null) {
                    continue;
                }

                foreach (DictionaryEntry entry in pathList) {
                    string path = (string)entry.Key;
                    if (uri.AbsolutePath.StartsWith(CookieParser.CheckQuoted(path))) {
                        found = true;

                        CookieCollection cc = (CookieCollection)entry.Value;
                        cc.TimeStamp(CookieCollection.Stamp.Set);
                        MergeUpdateCollections(cookies, cc, port, isSecure, (firstCompatibleVersion0SpecKey<0));

                        if (path == "/") {
                            defaultAdded = true;
                        }
                    }
                    else if (found) {
                        break;
                    }
                }

                if (!defaultAdded) {
                    CookieCollection cc = (CookieCollection)pathList["/"];

                    if (cc != null) {
                        cc.TimeStamp(CookieCollection.Stamp.Set);
                        MergeUpdateCollections(cookies, cc, port, isSecure, (firstCompatibleVersion0SpecKey<0));
                    }
                }

                // Remove unused domain
                // (This is the only place that does domain removal)
                if(pathList.Count == 0) {
                    AddRemoveDomain(key, null);
                }
            }
            return cookies;
        }

        private void MergeUpdateCollections(CookieCollection destination, CookieCollection source, int port, bool isSecure, bool isPlainOnly) {

            // we may change it
            lock (source) {

                //cannot use foreach as we going update 'source'
                for (int idx = 0 ; idx < source.Count; ++idx) {
                    bool to_add = false;

                    Cookie cookie = source[idx];

                    if (cookie.Expired) {
                        //If expired, remove from container and don't add to the destination
                        source.RemoveAt(idx);
                        --m_count;
                        --idx;
                    }
                    else {
                        //Add only if port does match to this request URI
                        //or was not present in the original response
                        if(isPlainOnly && cookie.Variant != CookieVariant.Plain) {
                            ;//don;t add
                        }
                        else if(cookie.PortList != null)
                        {
                            foreach (int p in cookie.PortList) {
                                if(p == port) {
                                    to_add = true;
                                    break;
                                }
                            }
                        }
                        else {
                            //it was implicit Port, always OK to add
                            to_add = true;
                        }

                        //refuse adding secure cookie into 'unsecure' destination
                        if (cookie.Secure && !isSecure) {
                            to_add = false;
                        }

                        if (to_add) {
                            // In 'source' are already orederd.
                            // If two same cookies come from dif 'source' then they
                            // will follow (not replace) each other.
                            destination.InternalAdd(cookie, false);
                        }

                    }
                }
            }
        }

        /// <devdoc>
        ///    <para>[To be supplied.]</para>
        /// </devdoc>
        public string GetCookieHeader(Uri uri) {
            if (uri == null) {
                throw new ArgumentNullException("uri");
            }
            string dummy;
            return GetCookieHeader(uri, out dummy);

        }

        internal string GetCookieHeader(Uri uri, out string optCookie2) {
            CookieCollection cookies = InternalGetCookies(uri);
            string cookieString = String.Empty;
            string delimiter = String.Empty;

            foreach (Cookie cookie in cookies) {
                cookieString += delimiter + cookie.ToString();
                delimiter = "; ";
            }
            optCookie2 = cookies.IsOtherVersionSeen ?
                          (Cookie.SpecialAttributeLiteral +
                           Cookie.VersionAttributeName +
                           Cookie.EqualsLiteral +
                           Cookie.MaxSupportedVersion.ToString(NumberFormatInfo.InvariantInfo)) : String.Empty;

            return cookieString;
        }











        public void SetCookies(Uri uri, string cookieHeader) {
            if (uri == null) {
                throw new ArgumentNullException("uri");
            }
            if(cookieHeader == null) {
                throw new ArgumentNullException("cookieHeader");
            }
            CookieCutter(uri, null, cookieHeader, true); //will throw on error
        }

#if DEBUG
        /// <devdoc>
        ///    <para>[To be supplied.]</para>
        /// </devdoc>
        internal void Dump() {
            GlobalLog.Print("CookieContainer:");
            foreach (DictionaryEntry de in m_domainTable) {
                GlobalLog.Print("domain = \"" + de.Key + "\"");
                ((PathList)de.Value).Dump();
            }
        }
#endif

    }

    [Serializable]
    internal class PathList {
        SortedList m_list = (SortedList.Synchronized(new SortedList(PathListComparer.StaticInstance)));

        public PathList() {
        }

        public int Count {
            get {
                return m_list.Count;
            }
        }

        public int GetCookiesCount() {
                int count = 0;
                foreach (CookieCollection cc in  m_list.Values) {
                    count += cc.Count;
                }
                return count;
        }

        public ICollection Values {
            get {
                return m_list.Values;
            }
        }

        public object this[string s] {
            get {
                return m_list[s];
            }
            set {
                m_list[s] = value;
            }
        }

        public IEnumerator GetEnumerator() {
            return m_list.GetEnumerator();
        }

        [Serializable]
        class PathListComparer : IComparer {
            internal static readonly PathListComparer StaticInstance = new PathListComparer();

            int IComparer.Compare(object ol, object or) {

                string pathLeft = CookieParser.CheckQuoted((string)ol);
                string pathRight = CookieParser.CheckQuoted((string)or);
                int ll = pathLeft.Length;
                int lr = pathRight.Length;
                int length = Math.Min(ll, lr);

                for (int i = 0; i < length; ++i) {
                    if (pathLeft[i] != pathRight[i]) {
                        return pathLeft[i] - pathRight[i];
                    }
                }
                return lr - ll;
            }
        }


#if DEBUG
        public void Dump() {
            GlobalLog.Print("PathList:");
            foreach (DictionaryEntry cookies in this) {
                GlobalLog.Print("collection = \"" + cookies.Key + "\"");
                ((CookieCollection)cookies.Value).Dump();
            }
        }
#endif

    }
}
