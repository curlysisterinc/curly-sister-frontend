import React from "react";

export function Terms({ isActive }) {
  return (
    <div className={isActive ? "block mt-7" : "hidden"}>
      <h1 className="text-3xl text-gray-400 font-bold mb-10 font-GTSuperText">
        TERMS AND CONDITIONS
      </h1>

      <p className="text-base text-gray-200 mb-6">Last updated: 2021-07-23</p>

      <ol className="pl-5 list-decimal">
        <li className="text-base text-gray-200 mb-6 list-decimal">
          <h2 className="text-base font-semibold text-gray-400 mb-2">
            Introduction
          </h2>
          <div>
            <p className="mb-4">
              Welcome to <strong>Curly Sister</strong> (“Company”, “we”, “our”,
              “us”)!
            </p>
            <p className="mb-4">
              These Terms of Service (“Terms”, “Terms of Service”) govern your
              use of our website located at{" "}
              <strong>
                <a className="underline" href="https://www.curlysister.com/">
                  https://www.curlysister.com/
                </a>
              </strong>{" "}
              (together or individually “Service”) operated by{" "}
              <strong>Curly Sister</strong>.
            </p>
            <p className="mb-4">
              Our Privacy Policy also governs your use of our Service and
              explains how we collect, safeguard and disclose information that
              results from your use of our web pages.
            </p>
            <p className="mb-4">
              Your agreement with us includes these Terms and our Privacy Policy
              (“Agreements”). You acknowledge that you have read and understood
              Agreements, and agree to be bound of them.
            </p>
            <p className="mb-4">
              If you do not agree with (or cannot comply with) Agreements, then
              you may not use the Service, but please let us know by emailing at
              <strong>
                {" "}
                <a className="underline" href="mailto:vivian@analogteams.com">
                  vivian@analogteams.com
                </a>
              </strong>{" "}
              so we can try to find a solution. These Terms apply to all
              visitors, users and others who wish to access or use Service.
            </p>
          </div>
        </li>

        <li className="text-base text-gray-200 mb-6 list-decimal">
          <h2 className="text-base font-semibold text-gray-400 mb-2">
            Communications
          </h2>
          <p className="mb-4">
            By using our Service, you agree to subscribe to newsletters,
            marketing or promotional materials and other information we may
            send. However, you may opt out of receiving any, or all, of these
            communications from us by following the unsubscribe link or by
            emailing at{" "}
            <strong>
              <a className="underline" href="mailto:vivian@analogteams.com">
                vivian@analogteams.com
              </a>
            </strong>
            .
          </p>
        </li>

        <li className="text-base text-gray-200 mb-6 ">
          <h2 className="text-base font-semibold text-gray-400 mb-2">
            Purchases
          </h2>
          <div>
            <p className="mb-4">
              Purchases If you wish to purchase any product or service made
              available through Service (“Purchase”), you may be asked to supply
              certain information relevant to your Purchase including but not
              limited to, your credit or debit card number, the expiration date
              of your card, your billing address, and your shipping information.
            </p>
            <p className="mb-4">
              <p className="mb-2">You represent and warrant that:</p>
              <ul type="I" className="pl-10">
                <li className="mb-2">
                  (i) you have the legal right to use any card(s) or other
                  payment methods in connection with any Purchase; and that
                </li>
                <li className="mb-2">
                  (ii) the information you supply to us is true, correct and
                  complete.
                </li>
              </ul>
            </p>
            <p className="mb-4">
              We may employ the use of third party services for the purpose of
              facilitating payment and the completion of Purchases. By
              submitting your information, you grant us the right to provide the
              information to these third parties subject to our Privacy Policy.
            </p>
            <p className="mb-4">
              We reserve the right to refuse or cancel your order at any time
              for reasons including but not limited to: product or service
              availability, errors in the description or price of the product or
              service, error in your order or other reasons.
            </p>
            <p className="mb-4">
              We reserve the right to refuse or cancel your order if fraud or an
              unauthorized or illegal transaction is suspected.
            </p>
          </div>
        </li>

        <li className="text-base text-gray-200 mb-6 list-decimal">
          <h2 className="text-base font-semibold text-gray-400 mb-2">
            Contests, Sweepstakes and Promotions
          </h2>
          <p className="mb-4">
            Any contests, sweepstakes or other promotions (collectively,
            “Promotions”) made available through Service may be governed by
            rules that are separate from these Terms of Service. If you
            participate in any Promotions, please review the applicable rules as
            well as our Privacy Policy. If the rules for a Promotion conflict
            with these Terms of Service, Promotion rules will apply.
          </p>
        </li>

        <li className="text-base text-gray-200 mb-6 ">
          <h2 className="text-base font-semibold text-gray-400 mb-2">
            Subscriptions
          </h2>
          <div>
            <p className="mb-4">
              Some parts of Service are billed on a subscription basis
              ("Subscription(s)"). You will be billed in advance on a recurring
              and periodic basis ("Billing Cycle"). Billing cycles will be set
              depending on the type of subscription plan you select when
              purchasing a Subscription.
            </p>

            <p className="mb-4">
              At the end of each Billing Cycle, your Subscription will
              automatically renew under the exact same conditions unless you
              cancel it or Curly Sister cancels it. You may cancel your
              Subscription renewal either through your online account management
              page or by contacting{" "}
              <strong>
                <a className="underline" href="mailto:vivian@analogteams.com">
                  vivian@analogteams.com
                </a>
              </strong>{" "}
              customer support team.
            </p>
            <p className="mb-4">
              A valid payment method is required to process the payment for your
              subscription. You shall provide Curly Sister with accurate and
              complete billing information that may include but not limited to
              full name, address, state, postal or zip code, telephone number,
              and a valid payment method information. By submitting such payment
              information, you automatically authorize Curly Sister to charge
              all Subscription fees incurred through your account to any such
              payment instruments.
            </p>
            <p className="mb-4">
              Should automatic billing fail to occur for any reason, Curly
              Sister reserves the right to terminate your access to the Service
              with immediate effect.
            </p>
          </div>
        </li>

        <li className="text-base text-gray-200 mb-6 ">
          <h2 className="text-base font-semibold text-gray-400 mb-2">
            Free Trial
          </h2>
          <div>
            <p className="mb-4">
              Curly Sister may, at its sole discretion, offer a Subscription
              with a free trial for a limited period of time ("Free Trial").
            </p>

            <p className="mb-4">
              You may be required to enter your billing information in order to
              sign up for Free Trial. If you do enter your billing information
              when signing up for Free Trial, you will not be charged by Curly
              Sister until Free Trial has expired.
            </p>
            <p className="mb-4">
              On the last day of Free Trial period, unless you cancelled your
              Subscription, you will be automatically charged the applicable
              Subscription fees for the type of Subscription you have selected.
              At any time and without notice, Curly Sister reserves the right to
              <ul type="I" className="pl-10">
                <li className="mb-2">
                  (i) modify Terms of Service of Free Trial offer,
                </li>
                <li className="mb-2">(ii) or cancel such Free Trial offer.</li>
              </ul>
            </p>
          </div>
        </li>

        <li className="text-base text-gray-200 mb-6 ">
          <h2 className="text-base font-semibold text-gray-400 mb-2">
            Fee Changes
          </h2>
          <div>
            <p className="mb-4">
              Curly Sister, in its sole discretion and at any time, may modify
              Subscription fees for the Subscriptions. Any Subscription fee
              change will become effective at the end of the then-current
              Billing Cycle. Curly Sister will provide you with a reasonable
              prior notice of any change in Subscription fees to give you an
              opportunity to terminate your Subscription before such change
              becomes effective. Your continued use of Service after
              Subscription fee change comes into effect constitutes your
              agreement to pay the modified Subscription fee amount.
            </p>
          </div>
        </li>

        <li className="text-base text-gray-200 mb-6 ">
          <h2 className="text-base font-semibold text-gray-400 mb-2">
            Refunds
          </h2>
          <div>
            <p className="mb-4">
              We issue refunds for Contracts within <strong>0 days</strong> of
              the original purchase of the Contract.
            </p>
          </div>
        </li>

        <li className="text-base text-gray-200 mb-6 ">
          <h2 className="text-base font-semibold text-gray-400 mb-2">
            Content
          </h2>
          <div>
            <p className="mb-4">
              <p className="mb-2">
                By posting Content on or through Service, You represent and
                warrant that:
              </p>
              <ul type="I" className="pl-10">
                <li className="mb-2">
                  (i) Content is yours (you own it) and/or you have the right to
                  use it and the right to grant us the rights and license as
                  provided in these Terms, and
                </li>
                <li className="mb-2">
                  (ii) that the posting of your Content on or through Service
                  does not violate the privacy rights, publicity rights,
                  copyrights, contract rights or any other rights of any person
                  or entity. We reserve the right to terminate the account of
                  anyone found to be infringing on a copyright.
                </li>
              </ul>
            </p>

            <p className="mb-4">
              You retain any and all of your rights to any Content you submit,
              post or display on or through Service and you are responsible for
              protecting those rights. We take no responsibility and assume no
              liability for Content you or any third party posts on or through
              Service. However, by posting Content using Service you grant us
              the right and license to use, modify, publicly perform, publicly
              display, reproduce, and distribute such Content on and through
              Service. You agree that this license includes the right for us to
              make your Content available to other users of Service, who may
              also use your Content subject to these Terms.
            </p>
            <p className="mb-4">
              Curly Sister has the right but not the obligation to monitor and
              edit all Content provided by users.
            </p>
            <p className="mb-4">
              In addition, Content found on or through this Service are the
              property of Curly Sister or used with permission. You may not
              distribute, modify, transmit, reuse, download, repost, copy, or
              use said Content, whether in whole or in part, for commercial
              purposes or for personal gain, without express advance written
              permission from us.
            </p>
          </div>
        </li>

        <li className="text-base text-gray-200 mb-6 ">
          <h2 className="text-base font-semibold text-gray-400 mb-2">
            Prohibited Uses
          </h2>
          <div>
            <p className="mb-4">
              <p className="mb-2">
                You may use Service only for lawful purposes and in accordance
                with Terms. You agree not to use Service:
              </p>
              <ul type="I" className="pl-10">
                <li className="mb-2">
                  (0.1) In any way that violates any applicable national or
                  international law or regulation.
                </li>
                <li className="mb-2">
                  (0.2) For the purpose of exploiting, harming, or attempting to
                  exploit or harm minors in any way by exposing them to
                  inappropriate content or otherwise.
                </li>
                <li className="mb-2">
                  (0.3) To transmit, or procure the sending of, any advertising
                  or promotional material, including any “junk mail”, “chain
                  letter,” “spam,” or any other similar solicitation.
                </li>
                <li className="mb-2">
                  (0.4) To impersonate or attempt to impersonate Company, a
                  Company employee, another user, or any other person or entity.
                </li>
                <li className="mb-2">
                  (0.5) In any way that infringes upon the rights of others, or
                  in any way is illegal, threatening, fraudulent, or harmful, or
                  in connection with any unlawful, illegal, fraudulent, or
                  harmful purpose or activity.
                </li>
                <li className="mb-2">
                  (0.6) To engage in any other conduct that restricts or
                  inhibits anyone’s use or enjoyment of Service, or which, as
                  determined by us, may harm or offend Company or users of
                  Service or expose them to liability.
                </li>
              </ul>
            </p>
            <p className="mb-4">
              <p className="mb-2">Additionally, you agree not to: </p>
              <ul type="I" className="pl-10">
                <li className="mb-2">
                  ( 0.1) Use Service in any manner that could disable,
                  overburden, damage, or impair Service or interfere with any
                  other party’s use of Service, including their ability to
                  engage in real-time activities through Service.
                </li>
                <li className="mb-2">
                  (0.2) Use any robot, spider, or other automatic devices,
                  process, or means to access Service for any purpose, including
                  monitoring or copying any of the material on Service.
                </li>
                <li className="mb-2">
                  (0.3) Use any manual process to monitor or copy any of the
                  material on Service or for any other unauthorized purpose
                  without our prior written consent.
                </li>
                <li className="mb-2">
                  (0.4) Use any device, software, or routine that interferes
                  with the proper working of Service.
                </li>
                <li className="mb-2">
                  (0.5) Introduce any viruses, trojan horses, worms, logic
                  bombs, or other material which is malicious or technologically
                  harmful.
                </li>
                <li className="mb-2">
                  (0.6) Attempt to gain unauthorized access to, interfere with,
                  damage, or disrupt any parts of Service, the server on which
                  Service is stored, or any server, computer, or database
                  connected to Service.
                </li>
                <li className="mb-2">
                  (0.7) Attack Service via a denial-of-service attack or a
                  distributed denial-of-service attack.
                </li>
                <li className="mb-2">
                  (0.8) Take any action that may damage or falsify the Company
                  rating.
                </li>
                <li className="mb-2">
                  (0.9) Otherwise attempt to interfere with the proper working
                  of Service
                </li>
              </ul>
            </p>
          </div>
        </li>

        <li className="text-base text-gray-200 mb-6 ">
          <h2 className="text-base font-semibold text-gray-400 mb-2">
            Analytics
          </h2>
          <div>
            <p className="mb-4">
              We may use third-party Service Providers to monitor and analyze
              the use of our Service.
            </p>
          </div>
        </li>

        <li className="text-base text-gray-200 mb-6 ">
          <h2 className="text-base font-semibold text-gray-400 mb-2">
            No Use By Minors
          </h2>
          <div>
            <p className="mb-4">
              Service is intended only for access and use by individuals at
              least eighteen (18) years old. By accessing or using Service, you
              warrant and represent that you are at least eighteen (18) years of
              age and with the full authority, right, and capacity to enter into
              this agreement and abide by all of the terms and conditions of
              Terms. If you are not at least eighteen (18) years old, you are
              prohibited from both the access and usage of Service.
            </p>
          </div>
        </li>

        <li className="text-base text-gray-200 mb-6 ">
          <h2 className="text-base font-semibold text-gray-400 mb-2">
            Accounts
          </h2>
          <div>
            <p className="mb-4">
              You are responsible for maintaining the confidentiality of your
              account and password, including but not limited to the restriction
              of access to your computer and/or account. You agree to accept
              responsibility for any and all activities or actions that occur
              under your account and/or password, whether your password is with
              our Service or a third-party service. You must notify us
              immediately upon becoming aware of any breach of security or
              unauthorized use of your account.
            </p>

            <p className="mb-4">
              You may not use as a username the name of another person or entity
              or that is not lawfully available for use, a name or trademark
              that is subject to any rights of another person or entity other
              than you, without appropriate authorization. You may not use as a
              username any name that is offensive, vulgar or obscene.
            </p>
            <p className="mb-4">
              We reserve the right to refuse service, terminate accounts, remove
              or edit content, or cancel orders in our sole discretion.
            </p>
          </div>
        </li>

        <li className="text-base text-gray-200 mb-6 ">
          <h2 className="text-base font-semibold text-gray-400 mb-2">
            Intellectual Property
          </h2>
          <div>
            <p className="mb-4">
              Service and its original content (excluding Content provided by
              users), features and functionality are and will remain the
              exclusive property of Curly Sister and its licensors. Service is
              protected by copyright, trademark, and other laws of and foreign
              countries. Our trademarks may not be used in connection with any
              product or service without the prior written consent of Curly
              Sister.
            </p>
          </div>
        </li>

        <li className="text-base text-gray-200 mb-6 ">
          <h2 className="text-base font-semibold text-gray-400 mb-2">
            Copyright Policy
          </h2>
          <div>
            <p className="mb-4">
              We respect the intellectual property rights of others. It is our
              policy to respond to any claim that Content posted on Service
              infringes on the copyright or other intellectual property rights
              (“Infringement”) of any person or entity.
            </p>

            <p className="mb-4">
              If you are a copyright owner or authorized on behalf of one, and
              you believe that the copyrighted work has been copied in a way
              that constitutes copyright infringement, please submit your claim
              via email to{" "}
              <strong>
                <a className="underline" href="mailto:info@curlysister.com">
                  info@curlysister.com
                </a>
              </strong>
              , with the subject line: “Copyright Infringement” and include in
              your claim a detailed description of the alleged Infringement as
              detailed below, under “DMCA Notice and Procedure for Copyright
              Infringement Claims”
            </p>
            <p className="mb-4">
              You may be held accountable for damages (including costs and
              attorneys’ fees) for misrepresentation or bad-faith claims on the
              infringement of any Content found on and/or through Service on
              your copyright.
            </p>
          </div>
        </li>

        <li className="text-base text-gray-200 mb-6 ">
          <h2 className="text-base font-semibold text-gray-400 mb-2">
            DMCA Notice and Procedure for Copyright Infringement Claims
          </h2>
          <div className="mb-4">
            <p className="mb-2">
              You may submit a notification pursuant to the Digital Millennium
              Copyright Act (DMCA) by providing our Copyright Agent with the
              following information in writing (see 17 U.S.C 512(c)(3) for
              further detail):
            </p>
            <ul type="I" className="pl-10">
              <li className="mb-2">
                (0.1) an electronic or physical signature of the person
                authorized to act on behalf of the owner of the copyright’s
                interest;
              </li>
              <li className="mb-2">
                (0.2) a description of the copyrighted work that you claim has
                been infringed, including the URL (i.e., web page address) of
                the location where the copyrighted work exists or a copy of the
                copyrighted work;
              </li>
              <li className="mb-2">
                (0.3) identification of the URL or other specific location on
                Service where the material that you claim is infringing is
                located;
              </li>
              <li className="mb-2">
                (0.4) your address, telephone number, and email address;
              </li>
              <li className="mb-2">
                (0.5) a statement by you that you have a good faith belief that
                the disputed use is not authorized by the copyright owner, its
                agent, or the law;
              </li>
              <li className="mb-2">
                (0.6) a statement by you, made under penalty of perjury, that
                the above information in your notice is accurate and that you
                are the copyright owner or authorized to act on the copyright
                owner’s behalf. You can contact our Copyright Agent via email at
                <strong>
                  {" "}
                  <a className="underline" href="mailto:info@curlysister.com">
                    info@curlysister.com
                  </a>
                </strong>
                .
              </li>
            </ul>
          </div>
        </li>

        <li className="text-base text-gray-200 mb-6 ">
          <h2 className="text-base font-semibold text-gray-400 mb-2">
            Error Reporting and Feedback
          </h2>
          <div className="mb-4">
            <p className="mb-2">
              You may provide us either directly at{" "}
              <strong>
                <a className="underline" href="mailto:vivian@analogteams.com">
                  vivian@analogteams.com
                </a>
              </strong>{" "}
              or via third-party sites and tools with information and feedback
              concerning errors, suggestions for improvements, ideas, problems,
              complaints, and other matters related to our Service (“Feedback”).
              You acknowledge and agree that:
            </p>
            <ul type="I" className="pl-10">
              <li className="mb-2">
                (i) you shall not retain, acquire or assert any intellectual
                property right or other right, title or interest in or to the
                Feedback;
              </li>
              <li className="mb-2">
                (ii) Company may have developed ideas similar to the Feedback;
              </li>
              <li className="mb-2">
                (iii) Feedback does not contain confidential information or
                proprietary information from you or any third party, and
              </li>
              <li className="mb-2">
                (iv) Company is not under any obligation of confidentiality with
                respect to the Feedback.
              </li>
            </ul>
            <p className="mb-2">
              In the event the transfer of the ownership to the Feedback is not
              possible due to applicable mandatory laws, you grant Company and
              its affiliates an exclusive, transferable, irrevocable,
              free-of-charge, sub-licensable, unlimited and perpetual right to
              use (including copy, modify, create derivative works, publish,
              distribute and commercialize) Feedback in any manner and for any
              purpose.
            </p>
          </div>
        </li>

        <li className="text-base text-gray-200 mb-6 ">
          <h2 className="text-base font-semibold text-gray-400 mb-2">
            Links To Other Web Sites
          </h2>
          <div className="mb-4">
            <p className="mb-2">
              Curly Sister has no control over, and assumes no responsibility
              for the content, privacy policies, or practices of any third-party
              websites or services. We do not warrant the offerings of any of
              these entities/individuals or their websites.
            </p>

            <p className="mb-2">
              For example, the outlined Terms of Use have been created using
              PolicyMaker.io, a free web application for generating high-quality
              legal documents. PolicyMaker’s Terms and Conditions generator is
              an easy-to-use free tool for creating an excellent standard Terms
              of Service template for a website, blog, e-commerce store or app.
            </p>
            <p className="mb-2">
              YOU ACKNOWLEDGE AND AGREE THAT COMPANY SHALL NOT BE RESPONSIBLE OR
              LIABLE, DIRECTLY OR INDIRECTLY, FOR ANY DAMAGE OR LOSS CAUSED OR
              ALLEGED TO BE CAUSED BY OR IN CONNECTION WITH USE OF OR RELIANCE
              ON ANY SUCH CONTENT, GOODS OR SERVICES AVAILABLE ON OR THROUGH ANY
              SUCH THIRD PARTY WEB SITES OR SERVICES.
            </p>
            <p className="mb-2">
              WE STRONGLY ADVISE YOU TO READ THE TERMS OF SERVICE AND PRIVACY
              POLICIES OF ANY THIRD PARTY WEB SITES OR SERVICES THAT YOU VISIT.
            </p>
          </div>
        </li>

        <li className="text-base text-gray-200 mb-6 ">
          <h2 className="text-base font-semibold text-gray-400 mb-2">
            Disclaimer Of Warranty
          </h2>
          <div className="mb-4">
            <p className="mb-2">
              THESE SERVICES ARE PROVIDED BY COMPANY ON AN “AS IS” AND “AS
              AVAILABLE” BASIS. COMPANY MAKES NO REPRESENTATIONS OR WARRANTIES
              OF ANY KIND, EXPRESS OR IMPLIED, AS TO THE OPERATION OF THEIR
              SERVICES, OR THE INFORMATION, CONTENT OR MATERIALS INCLUDED
              THEREIN. YOU EXPRESSLY AGREE THAT YOUR USE OF THESE SERVICES,
              THEIR CONTENT, AND ANY SERVICES OR ITEMS OBTAINED FROM US IS AT
              YOUR SOLE RISK.
            </p>

            <p className="mb-2">
              NEITHER COMPANY NOR ANY PERSON ASSOCIATED WITH COMPANY MAKES ANY
              WARRANTY OR REPRESENTATION WITH RESPECT TO THE COMPLETENESS,
              SECURITY, RELIABILITY, QUALITY, ACCURACY, OR AVAILABILITY OF THE
              SERVICES. WITHOUT LIMITING THE FOREGOING, NEITHER COMPANY NOR
              ANYONE ASSOCIATED WITH THE COMPANY REPRESENTS OR WARRANTS THAT THE
              SERVICES, THEIR CONTENT, OR ANY SERVICES OR ITEMS OBTAINED THROUGH
              THE SERVICES WILL BE ACCURATE, RELIABLE, ERROR-FREE, OR
              UNINTERRUPTED, THAT DEFECTS WILL BE CORRECTED, THAT THE SERVICES
              OR THE SERVER THAT MAKES IT AVAILABLE ARE FREE OF VIRUSES OR OTHER
              HARMFUL COMPONENTS OR THAT THE SERVICES OR ANY SERVICES OR ITEMS
              OBTAINED THROUGH THE SERVICES WILL OTHERWISE MEET YOUR NEEDS OR
              EXPECTATIONS.
            </p>
            <p className="mb-2">
              COMPANY HEREBY DISCLAIMS ALL WARRANTIES OF ANY KIND, WHETHER
              EXPRESS OR IMPLIED, STATUTORY, OR OTHERWISE, INCLUDING BUT NOT
              LIMITED TO ANY WARRANTIES OF MERCHANTABILITY, NON-INFRINGEMENT,
              AND FITNESS FOR A PARTICULAR PURPOSE.
            </p>
            <p className="mb-2">
              THE FOREGOING DOES NOT AFFECT ANY WARRANTIES WHICH CANNOT BE
              EXCLUDED OR LIMITED UNDER APPLICABLE LAW.
            </p>
          </div>
        </li>

        <li className="text-base text-gray-200 mb-6 ">
          <h2 className="text-base font-semibold text-gray-400 mb-2">
            Limitation Of Liability
          </h2>
          <div className="mb-4">
            <p className="mb-2">
              EXCEPT AS PROHIBITED BY LAW, YOU WILL HOLD US AND OUR OFFICERS,
              DIRECTORS, EMPLOYEES, AND AGENTS HARMLESS FOR ANY INDIRECT,
              PUNITIVE, SPECIAL, INCIDENTAL, OR CONSEQUENTIAL DAMAGE, HOWEVER,
              IT ARISES (INCLUDING ATTORNEYS’ FEES AND ALL RELATED COSTS AND
              EXPENSES OF LITIGATION AND ARBITRATION, OR AT TRIAL OR ON APPEAL,
              IF ANY, WHETHER OR NOT LITIGATION OR ARBITRATION IS INSTITUTED),
              WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE, OR OTHER TORTIOUS
              ACTION, OR ARISING OUT OF OR IN CONNECTION WITH THIS AGREEMENT,
              INCLUDING WITHOUT LIMITATION ANY CLAIM FOR PERSONAL INJURY OR
              PROPERTY DAMAGE, ARISING FROM THIS AGREEMENT AND ANY VIOLATION BY
              YOU OF ANY FEDERAL, STATE, OR LOCAL LAWS, STATUTES, RULES, OR
              REGULATIONS, EVEN IF COMPANY HAS BEEN PREVIOUSLY ADVISED OF THE
              POSSIBILITY OF SUCH DAMAGE. EXCEPT AS PROHIBITED BY LAW, IF THERE
              IS LIABILITY FOUND ON THE PART OF COMPANY, IT WILL BE LIMITED TO
              THE AMOUNT PAID FOR THE PRODUCTS AND/OR SERVICES, AND UNDER NO
              CIRCUMSTANCES WILL THERE BE CONSEQUENTIAL OR PUNITIVE DAMAGES.
              SOME STATES DO NOT ALLOW THE EXCLUSION OR LIMITATION OF PUNITIVE,
              INCIDENTAL OR CONSEQUENTIAL DAMAGES, SO THE PRIOR LIMITATION OR
              EXCLUSION MAY NOT APPLY TO YOU.
            </p>
          </div>
        </li>

        <li className="text-base text-gray-200 mb-6 ">
          <h2 className="text-base font-semibold text-gray-400 mb-2">
            Termination
          </h2>
          <div className="mb-4">
            <p className="mb-2">
              We may terminate or suspend your account and bar access to Service
              immediately, without prior notice or liability, under our sole
              discretion, for any reason whatsoever and without limitation,
              including but not limited to a breach of Terms.
            </p>

            <p className="mb-2">
              If you wish to terminate your account, you may simply discontinue
              using Service.
            </p>
            <p className="mb-2">
              All provisions of Terms which by their nature should survive
              termination shall survive termination, including, without
              limitation, ownership provisions, warranty disclaimers, indemnity
              and limitations of liability.
            </p>
          </div>
        </li>

        <li className="text-base text-gray-200 mb-6 ">
          <h2 className="text-base font-semibold text-gray-400 mb-2">
            Governing Law
          </h2>
          <div className="mb-4">
            <p className="mb-2">
              These Terms shall be governed and construed in accordance with the
              laws of Germany, which governing law applies to an agreement
              without regard to its conflict of law provisions.
            </p>

            <p className="mb-2">
              Our failure to enforce any right or provision of these Terms will
              not be considered a waiver of those rights. If any provision of
              these Terms is held to be invalid or unenforceable by a court, the
              remaining provisions of these Terms will remain in effect. These
              Terms constitute the entire agreement between us regarding our
              Service and supersede and replace any prior agreements we might
              have had between us regarding Service.
            </p>
          </div>
        </li>

        <li className="text-base text-gray-200 mb-6 ">
          <h2 className="text-base font-semibold text-gray-400 mb-2">
            Changes To Service
          </h2>
          <div className="mb-4">
            <p className="mb-2">
              We reserve the right to withdraw or amend our Service, and any
              service or material we provide via Service, in our sole discretion
              without notice. We will not be liable if for any reason all or any
              part of Service is unavailable at any time or for any period. From
              time to time, we may restrict access to some parts of Service, or
              the entire Service, to users, including registered users.
            </p>
          </div>
        </li>

        <li className="text-base text-gray-200 mb-6 ">
          <h2 className="text-base font-semibold text-gray-400 mb-2">
            Amendments To Terms
          </h2>
          <div className="mb-4">
            <p className="mb-2">
              We may amend Terms at any time by posting the amended terms on
              this site. It is your responsibility to review these Terms
              periodically.
            </p>
            <p className="mb-2">
              Your continued use of the Platform following the posting of
              revised Terms means that you accept and agree to the changes. You
              are expected to check this page frequently so you are aware of any
              changes, as they are binding on you.
            </p>
            <p className="mb-2">
              By continuing to access or use our Service after any revisions
              become effective, you agree to be bound by the revised terms. If
              you do not agree to the new terms, you are no longer authorized to
              use Service.
            </p>
          </div>
        </li>

        <li className="text-base text-gray-200 mb-6 ">
          <h2 className="text-base font-semibold text-gray-400 mb-2">
            Waiver And Severability
          </h2>
          <div className="mb-4">
            <p className="mb-2">
              No waiver by Company of any term or condition set forth in Terms
              shall be deemed a further or continuing waiver of such term or
              condition or a waiver of any other term or condition, and any
              failure of Company to assert a right or provision under Terms
              shall not constitute a waiver of such right or provision.
            </p>
            <p className="mb-2">
              If any provision of Terms is held by a court or other tribunal of
              competent jurisdiction to be invalid, illegal or unenforceable for
              any reason, such provision shall be eliminated or limited to the
              minimum extent such that the remaining provisions of Terms will
              continue in full force and effect.
            </p>
          </div>
        </li>

        <li className="text-base text-gray-200 mb-6 ">
          <h2 className="text-base font-semibold text-gray-400 mb-2">
            Acknowledgement
          </h2>
          <div className="mb-4">
            <p className="mb-2">
              BY USING SERVICE OR OTHER SERVICES PROVIDED BY US, YOU ACKNOWLEDGE
              THAT YOU HAVE READ THESE TERMS OF SERVICE AND AGREE TO BE BOUND BY
              THEM.
            </p>
          </div>
        </li>

        <li className="text-base text-gray-200 mb-6 ">
          <h2 className="text-base font-semibold text-gray-400 mb-2">
            Contact Us
          </h2>
          <div className="mb-4">
            <p className="mb-2">
              Please send your feedback, comments, requests for technical
              support by email:{" "}
              <strong>
                <a className="underline" href="mailto:info@curlysister.com">
                  info@curlysister.com
                </a>
              </strong>
              .
            </p>
          </div>
        </li>
      </ol>
    </div>
  );
}
