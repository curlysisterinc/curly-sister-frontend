import React from "react";

export function Privacy({ isActive }) {
  return (
    <div className={isActive ? "block mt-7" : "hidden"}>
      <h1 className="text-3xl text-gray-400 font-bold mb-10 font-GTSuperText">
        PRIVACY POLICY
      </h1>

      <p className="text-base text-gray-200 mb-6">Effective date: 2021-07-23</p>

      <ol className="pl-10 list-decimal">
        <li className="text-base text-gray-200 mb-6 list-decimal">
          <h2 className="text-base font-semibold text-gray-400 mb-2">
            Introduction
          </h2>
          <div>
            <p className="mb-4">
              Welcome to <strong>Curly Sister</strong>.
            </p>
            <p className="mb-4">
              <strong>Curly Sister</strong> (“us”, “we”, or “our”) operates{" "}
              <strong>
                <a className="underline" href="https://www.curlysister.com/">
                  https://www.curlysister.com/
                </a>
              </strong>{" "}
              (hereinafter referred to as <strong>“Service”</strong>).
            </p>
            <p className="mb-4">
              Our Privacy Policy governs your visit to{" "}
              <strong>
                <a className="underline" href="https://www.curlysister.com/">
                  https://www.curlysister.com/
                </a>
              </strong>{" "}
              , and explains how we collect, safeguard and disclose information
              that results from your use of our Service.
            </p>
            <p className="mb-4">
              We use your data to provide and improve Service. By using Service,
              you agree to the collection and use of information in accordance
              with this policy. Unless otherwise defined in this Privacy Policy,
              the terms used in this Privacy Policy have the same meanings as in
              our Terms and Conditions.
            </p>
            <p className="mb-4">
              Our Privacy Policy governs your visit to{" "}
              <strong>
                <a className="underline" href="https://www.curlysister.com/">
                  https://www.curlysister.com/
                </a>
              </strong>{" "}
              , and explains how we collect, safeguard and disclose information
              that results from your use of our Service. Our Terms and
              Conditions ( <strong>“Terms”</strong>) govern all use of our
              Service and together with the Privacy Policy constitute your
              agreement with us ( <strong>“agreement”</strong>).
            </p>
          </div>
        </li>

        <li className="text-base text-gray-200 mb-6 ">
          <h2 className="text-base font-semibold text-gray-400 mb-2">
            Definitions
          </h2>
          <div>
            <p className="mb-4">
              <ul type="I" className=" list-none">
                <li className="mb-2">
                  <strong>SERVICE</strong> means the{" "}
                  <strong>
                    <a
                      className="underline"
                      href="https://www.curlysister.com/"
                    >
                      https://www.curlysister.com/
                    </a>
                  </strong>{" "}
                  website operated by Curly Sister.
                </li>
                <li className="mb-2">
                  <strong>PERSONAL DATA</strong> means data about a living
                  individual who can be identified from those data (or from
                  those and other information either in our possession or likely
                  to come into our possession).
                </li>
                <li className="mb-2">
                  <strong>USAGE DATA</strong> is data collected automatically
                  either generated by the use of Service or from the Service
                  infrastructure itself (for example, the duration of a page
                  visit).
                </li>
                <li className="mb-2">
                  <strong>COOKIES </strong> are small files stored on your
                  device (computer or mobile device).
                </li>
                <li className="mb-2">
                  <strong>DATA CONTROLLER</strong> means a natural or legal
                  person who (either alone or jointly or in common with other
                  persons) determines the purposes for which and the manner in
                  which any personal data are, or are to be, processed. For the
                  purpose of this Privacy Policy, we are a Data Controller of
                  your data.
                </li>
                <li className="mb-2">
                  <strong>DATA PROCESSORS (OR SERVICE PROVIDERS)</strong> means
                  any natural or legal person who processes the data on behalf
                  of the Data Controller. We may use the services of various
                  Service Providers in order to process your data more
                  effectively.
                </li>
                <li className="mb-2">
                  <strong>DATA SUBJECT</strong> is any living individual who is
                  the subject of Personal Data.
                </li>
                <li className="mb-2">
                  <strong>THE USER</strong> is the individual using our Service.
                  The User corresponds to the Data Subject, who is the subject
                  of Personal Data.
                </li>
              </ul>
            </p>
          </div>
        </li>

        <li className="text-base text-gray-200 mb-6 list-decimal">
          <h2 className="text-base font-semibold text-gray-400 mb-2">
            Information Collection and Use
          </h2>
          <p className="mb-4">
            We collect several different types of information for various
            purposes to provide and improve our Service to you.
          </p>
        </li>

        <li className="text-base text-gray-200 mb-6 list-decimal">
          <h3 className="text-base font-semibold text-gray-400">
            Types of Data Collected
          </h3>
          <ol className="pl-10 list-decimal">
            <li className="text-base text-gray-200 mb-6 list-none">
              <h2 className="text-base font-semibold text-gray-400 mb-2">
                Personal Data
              </h2>
              <p className="mb-4">
                While using our Service, we may ask you to provide us with
                certain personally identifiable information that can be used to
                contact or identify you (<strong>“Personal Data”</strong>).
                Personally, identifiable information may include, but is not
                limited to:
              </p>
              <ul type="I" className="pl-10">
                <li className="mb-2">0.1. Email address </li>
                <li className="mb-2"> 0.2. First name and last name </li>
                <li className="mb-2"> 0.3. Phone number </li>
                <li className="mb-2">
                  0.4. Address, Country, State, Province, ZIP/Postal code, City
                </li>
                <li className="mb-2"> 0.5. Cookies and Usage Data</li>
              </ul>
              <p className="mb-4">
                We may use your Personal Data to contact you with newsletters,
                marketing or promotional materials, and other information that
                may be of interest to you. You may opt-out of receiving any, or
                all, of these communications from us by following the
                unsubscribe link.
              </p>
            </li>

            <li className="text-base text-gray-200 mb-6 list-none">
              <h3 className="text-base font-semibold text-gray-400">
                Usage Data
              </h3>
              <p className="mb-4">
                We may also collect information that your browser sends whenever
                you visit our Service or when you access Service by or through
                any device (<strong>“Usage Data”</strong>).
              </p>

              <p className="mb-4">
                This Usage Data may include information such as your computer’s
                Internet Protocol address (e.g. IP address), browser type,
                browser version, the pages of our Service that you visit, the
                time and date of your visit, the time spent on those pages,
                unique device identifiers and other diagnostic data.
              </p>
              <p className="mb-4">
                When you access Service with a device, this Usage Data may
                include information such as the type of device you use, your
                device unique ID, the IP address of your device, your device
                operating system, the type of Internet browser you use, unique
                device identifiers and other diagnostic data.
              </p>
            </li>

            <li className="text-base text-gray-200 mb-6 list-none">
              <h3 className="text-base font-semibold text-gray-400">
                Location Data
              </h3>
              <p className="mb-4">
                We may use and store information about your location if you give
                us permission to do so (<strong>“Location Data”</strong>). We
                use this data to provide features of our Service, to improve and
                customize our Service.
              </p>
              <p className="mb-4">
                You can enable or disable location services when you use our
                Service at any time by way of your device settings.
              </p>
            </li>

            <li className="text-base text-gray-200 mb-6 list-none">
              <h3 className="text-base font-semibold text-gray-400">
                Tracking Cookies Data
              </h3>
              <p className="mb-4">
                We use cookies and similar tracking technologies to track the
                activity on our Service and we hold certain information.
              </p>
              <p className="mb-4">
                Cookies are files with a small amount of data which may include
                an anonymous unique identifier. Cookies are sent to your browser
                from a website and stored on your device. Other tracking
                technologies are also used such as beacons, tags and scripts to
                collect and track information and to improve and analyze our
                Service.
              </p>
              <p className="mb-4">
                You can instruct your browser to refuse all cookies or to
                indicate when a cookie is being sent. However, if you do not
                accept cookies, you may not be able to use some portions of our
                Service.
              </p>

              <p className="mb-4">
                <p className="mb-2">Examples of Cookies we use:</p>
                <ul type="I" className="pl-10">
                  <li className="mb-2">
                    0.1. <strong>Session Cookies</strong>: We use Session
                    Cookies to operate our Service.
                  </li>
                  <li className="mb-2">
                    0.2. <strong>Preference Cookies</strong>: We use Preference
                    Cookies to remember your preferences and various settings.
                  </li>
                  <li className="mb-2">
                    0.3. <strong>Security Cookies</strong>: We use Security
                    Cookies for security purposes.
                  </li>
                  <li className="mb-2">
                    0.4. <strong>Advertising Cookies</strong>: Advertising
                    Cookies are used to serve you with advertisements that may
                    be relevant to you and your interests.
                  </li>
                </ul>
              </p>
            </li>

            <li className="text-base text-gray-200 mb-6 list-none">
              <h3 className="text-base font-semibold text-gray-400">
                Other Data
              </h3>
              <p className="mb-4">
                While using our Service, we may also collect the following
                information: sex, age, date of birth, place of birth, passport
                details, citizenship, registration at the place of residence and
                actual address, telephone number (work, mobile), details of
                documents on education, qualification, professional training,
                employment agreements, NDA agreements, information on bonuses
                and compensation, information on marital status, family members,
                social security (or other taxpayer identification) number,
                office location, and other data.
              </p>
            </li>
          </ol>
        </li>

        <li className="text-base text-gray-200 mb-6 list-decimal">
          <h2 className="text-base font-semibold text-gray-400 mb-2">
            Use of Data
          </h2>
          <p className="mb-4">
            Curly Sister uses the collected data for various purposes:
          </p>
          <ul type="I" className="pl-10">
            <li className="mb-2">0.1. to provide and maintain our Service;</li>
            <li className="mb-2">
              0.2. to notify you about changes to our Service;
            </li>
            <li className="mb-2">
              0.3. to allow you to participate in interactive features of our
              Service when you choose to do so;
            </li>
            <li className="mb-2">0.4. to provide customer support;</li>
            <li className="mb-2">
              0.5. to gather analysis or valuable information so that we can
              improve our Service;
            </li>
            <li className="mb-2">0.6. to monitor the usage of our Service;</li>
            <li className="mb-2">
              0.7. to detect, prevent and address technical issues;
            </li>
            <li className="mb-2">
              0.8. to fulfill any other purpose for which you provide it;
            </li>
            <li className="mb-2">
              0.9. to carry out our obligations and enforce our rights arising
              from any contracts entered into between you and us, including for
              billing and collection;
            </li>
            <li className="mb-2">
              0.10. to provide you with notices about your account and/or
              subscription, including expiration and renewal notices, email
              instructions, etc.;
            </li>
            <li className="mb-2">
              0.11. to provide you with news, special offers and general
              information about other goods, services, and events which we offer
              that are similar to those that you have already purchased or
              enquired about unless you have opted not to receive such
              information;
            </li>
            <li className="mb-2">
              0.12. in any other way we may describe when you provide the
              information;
            </li>
            <li className="mb-2">
              0.13. for any other purpose with your consent.
            </li>
          </ul>
        </li>

        <li className="text-base text-gray-200 mb-6 list-decimal">
          <h2 className="text-base font-semibold text-gray-400 mb-2">
            Retention of Data
          </h2>
          <p className="mb-4">
            We will retain your Personal Data only for as long as is necessary
            for the purposes set out in this Privacy Policy.
          </p>
          <p className="mb-4">
            We will retain and use your Personal Data to the extent necessary to
            comply with our legal obligations (for example, if we are required
            to retain your data to comply with applicable laws), resolve
            disputes, and enforce our legal agreements and policies.
          </p>
          <p className="mb-4">
            We will also retain Usage Data for internal analysis purposes. Usage
            Data is generally retained for a shorter period, except when this
            data is used to strengthen the security or to improve the
            functionality of our Service, or we are legally obligated to retain
            this data for longer time periods.
          </p>
        </li>

        <li className="text-base text-gray-200 mb-6 list-decimal">
          <h2 className="text-base font-semibold text-gray-400 mb-2">
            Transfer of Data
          </h2>
          <p className="mb-4">
            Your information, including Personal Data, may be transferred to –
            and maintained on – computers located outside of your state,
            province, country or other governmental jurisdiction where the data
            protection laws may differ from those of your jurisdiction.
          </p>
          <p className="mb-4">
            If you are located outside Germany and choose to provide information
            to us, please note that we transfer the data, including Personal
            Data, to Germany and process it there. Your consent to this Privacy
            Policy followed by your submission of such information represents
            your agreement to that transfer.
          </p>
          <p className="mb-4">
            Curly Sister will take all the steps reasonably necessary to ensure
            that your data is treated securely and in accordance with this
            Privacy Policy and no transfer of your Personal Data will take place
            to an organization or a country unless there are adequate controls
            in place including the security of your data and other personal
            information.
          </p>
        </li>

        <li className="text-base text-gray-200 mb-6 list-decimal">
          <h2 className="text-base font-semibold text-gray-400 mb-2">
            Disclosure of Data
          </h2>
          <p className="mb-4">
            We may disclose personal information that we collect, or you
            provide:
          </p>
          <ul type="I" className="pl-10">
            <li className="mb-2">
              <h3 className="text-base font-semibold text-gray-400">
                0.1. Business Transaction.
              </h3>
              <p className="mb-4">
                If we or our subsidiaries are involved in a merger, acquisition
                or asset sale, your Personal Data may be transferred.
              </p>
            </li>
            <li className="mb-2">
              <h3 className="text-base font-semibold text-gray-400">
                0.2. Other cases. We may disclose your information also:
              </h3>
              <ul type="I" className="pl-10">
                <li className="mb-2">
                  0.2.1. to our subsidiaries and affiliates;
                </li>
                <li className="mb-2">
                  0.2.2. to contractors, service providers, and other third
                  parties we use to support our business;
                </li>
                <li className="mb-2">
                  0.2.3. to fulfill the purpose for which you provide it;
                </li>
                <li className="mb-2">
                  0.2.4. for the purpose of including your company’s logo on our
                  website;
                </li>
                <li className="mb-2">
                  0.2.5. for any other purpose disclosed by us when you provide
                  the information;
                </li>
                <li className="mb-2">
                  0.2.6. with your consent in any other cases;
                </li>
                <li className="mb-2">
                  0.2.7. if we believe disclosure is necessary or appropriate to
                  protect the rights, property, or safety of the Company, our
                  customers, or others.
                </li>
              </ul>
            </li>
          </ul>
        </li>

        <li className="text-base text-gray-200 mb-6 list-decimal">
          <h2 className="text-base font-semibold text-gray-400 mb-2">
            Security of Data
          </h2>
          <p className="mb-4">
            The security of your data is important to us but remember that no
            method of transmission over the Internet or method of electronic
            storage is 100% secure. While we strive to use commercially
            acceptable means to protect your Personal Data, we cannot guarantee
            its absolute security.
          </p>
        </li>

        <li className="text-base text-gray-200 mb-6 list-decimal">
          <h2 className="text-base font-semibold text-gray-400 mb-2">
            Your Data Protection Rights Under General Data Protection Regulation
            (GDPR)
          </h2>
          <p className="mb-4">
            If you are a resident of the European Union (EU) and European
            Economic Area (EEA), you have certain data protection rights,
            covered by GDPR.
          </p>
          <p className="mb-4">
            We aim to take reasonable steps to allow you to correct, amend,
            delete, or limit the use of your Personal Data.
          </p>
          <p className="mb-4">
            If you wish to be informed what Personal Data we hold about you and
            if you want it to be removed from our systems, please email us at
            <strong>
              {" "}
              <a className="underline" href="mailto:vivian@analogteams.com">
                vivian@analogteams.com
              </a>
            </strong>{" "}
          </p>
          <p className="mb-4">
            In certain circumstances, you have the following data protection
            rights:
          </p>
          <ul type="I" className="pl-10 mb-4">
            <li className="mb-2">
              0.1. the right to access, update or to delete the information we
              have on you;
            </li>
            <li className="mb-2">
              0.2. the right of rectification. You have the right to have your
              information rectified if that information is inaccurate or
              incomplete;
            </li>
            <li className="mb-2">
              0.3. the right to object. You have the right to object to our
              processing of your Personal Data;
            </li>
            <li className="mb-2">
              0.4. the right of restriction. You have the right to request that
              we restrict the processing of your personal information;
            </li>
            <li className="mb-2">
              0.5. the right to data portability. You have the right to be
              provided with a copy of your Personal Data in a structured,
              machine-readable and commonly used format;
            </li>
            <li className="mb-2">
              0.6. the right to withdraw consent. You also have the right to
              withdraw your consent at any time where we rely on your consent to
              process your personal information;
            </li>
          </ul>

          <p className="mb-4">
            Please note that we may ask you to verify your identity before
            responding to such requests. Please note, we may not able to provide
            Service without some necessary data.
          </p>
          <p className="mb-4">
            You have the right to complain to a Data Protection Authority about
            our collection and use of your Personal Data. For more information,
            please contact your local data protection authority in the European
            Economic Area (EEA).
          </p>
        </li>

        <li className="text-base text-gray-200 mb-6 list-decimal">
          <h2 className="text-base font-semibold text-gray-400 mb-2">
            Your Data Protection Rights under the California Privacy Protection
            Act (CalOPPA)
          </h2>
          <p className="mb-4">
            CalOPPA is the first state law in the nation to require commercial
            websites and online services to post a privacy policy. The law’s
            reach stretches well beyond California to require a person or
            company in the United States (and conceivable the world) that
            operates websites collecting personally identifiable information
            from California consumers to post a conspicuous privacy policy on
            its website stating exactly the information being collected and
            those individuals with whom it is being shared, and to comply with
            this policy.
          </p>
          <p className="mb-4">
            According to CalOPPA we agree to the following:
          </p>
          <ul type="I" className="pl-10 mb-4">
            <li className="mb-2">0.1. users can visit our site anonymously;</li>
            <li className="mb-2">
              0.2. our Privacy Policy link includes the word “Privacy”, and can
              easily be found on the home page of our website;
            </li>
            <li className="mb-2">
              0.3. users will be notified of any privacy policy changes on our
              Privacy Policy Page;
            </li>
            <li className="mb-2">
              0.4. users are able to change their personal information by
              emailing us at{" "}
              <strong>
                {" "}
                <a className="underline" href="mailto:info@curlysister.com">
                  info@curlysister.com
                </a>
              </strong>{" "}
            </li>
          </ul>

          <p className="mb-4">Our Policy on “Do Not Track” Signals:</p>
          <p className="mb-4">
            We honor Do Not Track signals and do not track, plant cookies, or
            use advertising when a Do Not Track browser mechanism is in place.
            Do Not Track is a preference you can set in your web browser to
            inform websites that you do not want to be tracked.
          </p>
          <p className="mb-4">
            You can enable or disable Do Not Track by visiting the Preferences
            or Settings page of your web browser.
          </p>
        </li>

        <li className="text-base text-gray-200 mb-6 list-decimal">
          <h2 className="text-base font-semibold text-gray-400 mb-2">
            Your Data Protection Rights under the California Consumer Privacy
            Act (CCPA)
          </h2>
          <p className="mb-4">
            If you are a California resident, you are entitled to learn what
            data we collect about you, ask to delete your data and not to sell
            (share) it. To exercise your data protection rights, you can make
            certain requests and ask us:
          </p>

          <ul type="I" className="pl-10 mb-4">
            <li className="mb-2">
              <h3 className="text-base font-semibold text-gray-400 mb-2">
                0.1. What personal information we have about you. If you make
                this request, we will return to you:
              </h3>
              <ul type="I" className="pl-10 mb-4">
                <li className="mb-2">
                  0.0.1. The categories of personal information we have
                  collected about you.
                </li>
                <li className="mb-2">
                  0.0.2. The categories of sources from which we collect your
                  personal information.
                </li>
                <li className="mb-2">
                  0.0.3. The business or commercial purpose for collecting or
                  selling your personal information.
                </li>
                <li className="mb-2">
                  0.0.4. The categories of third parties with whom we share
                  personal information.
                </li>
                <li className="mb-2">
                  0.0.5. The specific pieces of personal information we have
                  collected about you.
                </li>
                <li className="mb-2">
                  0.0.6. A list of categories of personal information that we
                  have sold, along with the category of any other company we
                  sold it to. If we have not sold your personal information, we
                  will inform you of that fact.
                </li>
                <li className="mb-2">
                  0.0.7. A list of categories of personal information that we
                  have disclosed for a business purpose, along with the category
                  of any other company we shared it with.
                </li>
              </ul>

              <p className="mb-4">
                Please note, you are entitled to ask us to provide you with this
                information up to two times in a rolling twelve-month period.
                When you make this request, the information provided may be
                limited to the personal information we collected about you in
                the previous 12 months.
              </p>
            </li>
            <li className="mb-2">
              <h3 className="text-base font-semibold text-gray-400 mb-2">
                0.2. To delete your personal information. If you make this
                request, we will delete the personal information we hold about
                you as of the date of your request from our records and direct
                any service providers to do the same. In some cases, deletion
                may be accomplished through de-identification of the
                information. If you choose to delete your personal information,
                you may not be able to use certain functions that require your
                personal information to operate.
              </h3>
            </li>
            <li className="mb-2">
              <h3 className="text-base font-semibold text-gray-400 mb-2">
                0.3. To stop selling your personal information. We don’t sell or
                rent your personal information to any third parties for any
                purpose. We do not sell your personal information for monetary
                consideration. However, under some circumstances, a transfer of
                personal information to a third party, or within our family of
                companies, without monetary consideration may be considered a
                “sale” under California law. You are the only owner of your
                Personal Data and can request disclosure or deletion at any
                time.
              </h3>
            </li>
          </ul>

          <p className="mb-4">
            If you submit a request to stop selling your personal information,
            we will stop making such transfers.
          </p>

          <p className="mb-4">
            Please note, if you ask us to delete or stop selling your data, it
            may impact your experience with us, and you may not be able to
            participate in certain programs or membership services which require
            the usage of your personal information to function. But in no
            circumstances, we will discriminate against you for exercising your
            rights.
          </p>

          <p className="mb-4">
            To exercise your California data protection rights described above,
            please send your request(s) by email:{" "}
            <strong>
              {" "}
              <a className="underline" href="mailto:vivian@analogteams.com">
                vivian@analogteams.com
              </a>
            </strong>
            .
          </p>

          <p className="mb-4">
            Your data protection rights, described above, are covered by the
            CCPA, short for the California Consumer Privacy Act. To find out
            more, visit the official California Legislative Information website.
            The CCPA took effect on 01/01/2020.
          </p>
        </li>

        <li className="text-base text-gray-200 mb-6 list-decimal">
          <h2 className="text-base font-semibold text-gray-400 mb-2">
            Service Providers
          </h2>
          <p className="mb-4">
            We may employ third-party companies and individuals to facilitate
            our Service (<strong>“Service Providers”</strong>), provide Service
            on our behalf, perform Service-related services or assist us in
            analyzing how our Service is used.
          </p>
          <p className="mb-4">
            These third parties have access to your Personal Data only to
            perform these tasks on our behalf and are obligated not to disclose
            or use it for any other purpose.
          </p>
        </li>

        <li className="text-base text-gray-200 mb-6 list-decimal">
          <h2 className="text-base font-semibold text-gray-400 mb-2">
            Analytics
          </h2>
          <p className="mb-4">
            We may use third-party Service Providers to monitor and analyze the
            use of our Service.
          </p>
        </li>

        <li className="text-base text-gray-200 mb-6 list-decimal">
          <h2 className="text-base font-semibold text-gray-400 mb-2">
            CI/CD tools
          </h2>
          <p className="mb-4">
            We may use third-party Service Providers to automate the development
            process of our Service.
          </p>
        </li>

        <li className="text-base text-gray-200 mb-6 list-decimal">
          <h2 className="text-base font-semibold text-gray-400 mb-2">
            Advertising
          </h2>
          <p className="mb-4">
            We may use third-party Service Providers to show advertisements to
            you to help support and maintain our Service.
          </p>
        </li>

        <li className="text-base text-gray-200 mb-6 list-decimal">
          <h2 className="text-base font-semibold text-gray-400 mb-2">
            Behavioral Remarketing
          </h2>
          <p className="mb-4">
            We may use remarketing services to advertise on third-party websites
            to you after you visited our Service. We and our third-party vendors
            use cookies to inform, optimize and serve ads based on your past
            visits to our Service.
          </p>
        </li>

        <li className="text-base text-gray-200 mb-6 list-decimal">
          <h2 className="text-base font-semibold text-gray-400 mb-2">
            Payments
          </h2>
          <p className="mb-4">
            We may provide paid products and/or services within Service. In that
            case, we use third-party services for payment processing (e.g.
            payment processors).
          </p>
          <p className="mb-4">
            We will not store or collect your payment card details. That
            information is provided directly to our third-party payment
            processors whose use of your personal information is governed by
            their Privacy Policy. These payment processors adhere to the
            standards set by PCI-DSS as managed by the PCI Security Standards
            Council, which is a joint effort of brands like Visa, Mastercard,
            American Express, and Discover. PCI-DSS requirements help ensure the
            secure handling of payment information.
          </p>
        </li>

        <li className="text-base text-gray-200 mb-6 list-decimal">
          <h2 className="text-base font-semibold text-gray-400 mb-2">
            Links to Other Sites
          </h2>
          <p className="mb-4">
            Our Service may contain links to other sites that are not operated
            by us. If you click a third-party link, you will be directed to that
            third party’s site. We strongly advise you to review the Privacy
            Policy of every site you visit.
          </p>
          <p className="mb-4">
            We have no control over and assume no responsibility for the
            content, privacy policies or practices of any third-party sites or
            services.
          </p>
          <p className="mb-4">
            For example, the outlined privacy policy has been made using
            PolicyMaker.io, a free tool that helps create high-quality legal
            documents. PolicyMaker’s privacy policy generator is an easy-to-use
            tool for creating a privacy policy for blog, website, e-commerce
            store or mobile app.
          </p>
        </li>

        <li className="text-base text-gray-200 mb-6 list-decimal">
          <h2 className="text-base font-semibold text-gray-400 mb-2">
            Children’s Privacy
          </h2>
          <p className="mb-4">
            Our Services are not intended for use by children under the age of
            18 (<strong>“Child”</strong> or <strong>“Children”</strong>).
          </p>
          <p className="mb-4">
            We do not knowingly collect personally identifiable information from
            children under 18. If you become aware that a child has provided us
            with Personal Data, please contact us. If we become aware that we
            have collected Personal Data from children without verification of
            parental consent, we take steps to remove that information from our
            servers.
          </p>
        </li>

        <li className="text-base text-gray-200 mb-6 list-decimal">
          <h2 className="text-base font-semibold text-gray-400 mb-2">
            Changes to This Privacy Policy
          </h2>
          <p className="mb-4">
            We may update our Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page.
          </p>
          <p className="mb-4">
            We will let you know via email and/or a prominent notice on our
            Service, prior to the change becoming effective and update
            “effective date” at the top of this Privacy Policy.
          </p>
          <p className="mb-4">
            You are advised to review this Privacy Policy periodically for any
            changes. Changes to this Privacy Policy are effective when they are
            posted on this page.
          </p>
        </li>

        <li className="text-base text-gray-200 mb-6 list-decimal">
          <h2 className="text-base font-semibold text-gray-400 mb-2">
            Contact Us
          </h2>
          <p className="mb-4">
            If you have any questions about this Privacy Policy, please contact
            us by email:{" "}
            <strong>
              {" "}
              <a className="underline" href="mailto:info@curlysister.com">
                info@curlysister.com
              </a>
            </strong>
            .{" "}
          </p>
        </li>
      </ol>
    </div>
  );
}
