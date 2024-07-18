import { NextPage } from 'next';
import Link from 'next/link';
import { Head } from '../../components';
import Image from 'next/image';

// Client side React.js code
const HomePage: NextPage = () => {
  return (
    <>
      <Head
        title="Imprint - Crystopia.net"
        description="Unique Minecraft server with a focus on community and creativity. Join us today!"
      />
      <div className="flex items-center space-x-4 md:space-x-5 lg:space-x-6">
        <Image
          className="w-8 h-8 rounded-full prevent-default md:w-10 lg:w-12 md:h-10 lg:h-12"
          src="/images/crystopia.png"
          alt="Crystopia.net"
          sizes="(max-width: 768px) 32px, (max-width: 1024px) 40px, 48px"
          width={48}
          height={48}
        />
        <h1>Crystopia.net | Imprint</h1>
      </div>
      <br></br>
      <br></br>
      <p> Imprint According to § 5 DDG </p>
      <br></br>
      <br></br>
      <div>
        <div>Jesper Richert</div>
        <div>Kiebitzreihe 3</div>
        <div>25813 Husum</div>
        <div>Deutschland </div>
      </div>
      <br></br>
      <strong>Contact E-Mail</strong>:
      <div>
        {' '}
        <Link href={'mailto://contact@tnsstudio.net'}>
          contact@tnsstudio.net
        </Link>
      </div>
      <br></br>
      <strong>Editorial responsibility Represented by</strong>:{' '}
      <div>Jesper Richert</div>
      <br></br>
      <h4>Disclaimer</h4>
      <p>
        § 1 Warning about content The free and freely accessible content of this
        website was createdwith the greatest possible care. However, the
        provider of thiswebsite does not guarantee the correctness and
        topicality of thefree and freely accessible journalistic advice and news
        provided.Contributions identified by name reflect the opinion of
        therespective author and not always the opinion of the provider.
        Simplyby calling up the free and freely accessible content, no
        contractualrelationship is established between the user and the
        provider,insofar as the provider lacks the will to be legally bound.
      </p>
      <p>
        § 2 External Links This website contains links to websites of third
        parties (externallinks). These websites are the responsibility of the
        respectiveoperators. When the external links were first linked, the
        providerchecked the third-party content for any legal violations. At
        thattime, no legal violations were apparent. The provider has
        noinfluence on the current and future design and content of the
        linkedpages. The setting of external links does not mean that the
        provideradopts the content behind the reference or link as his own.
        Constantmonitoring of the external links is not reasonable for the
        providerwithout concrete evidence of legal violations. With knowledge
        oflegal violations, such external links will be deleted immediately.
      </p>
      <p>
        {' '}
        § 3 Copyright and ancillary copyrights The content published on this
        website is subject to German copyrightand ancillary copyright law. Any
        use not permitted by Germancopyright and ancillary copyright law
        requires the prior writtenconsent of the provider or the respective
        rights holder. Thisapplies in particular to the duplication, editing,
        translation,storage, processing or reproduction of content in databases
        or otherelectronic media and systems. Contents and rights of third
        partiesare marked as such. The unauthorized duplication or distribution
        ofindividual content or complete pages is not permitted and
        ispunishable. Only the production of copies and downloads forpersonal,
        private and non-commercial use is permitted. The presentation of this
        website in external frames is onlypermitted with written permission.
      </p>
      <p>
        {' '}
        § 4 Special Terms of Use Insofar as special conditions for individual
        uses of this websitedeviate from the aforementioned paragraphs, this is
        expresslypointed out at the appropriate point. In this case, the
        specialterms of use apply in each individual case. The European
        Commission provides a platform for out-of-court onlinedispute resolution
        (OS platform), available athttp://ec.europa.eu/odr.
      </p>
      <br></br>
      <ul className="flex mt-6 space-x-8 prevent-default md:space-x-9 lg:space-x-10 md:mt-8 lg:mt-10">
        {[].map(({ href }) => (
          <li key={href}>
            <a
              className="block h-8 text-black prevent-default lg:h-9 dark:text-white"
              href={href}
              target="_blank"
              rel="noreferrer"
            ></a>
          </li>
        ))}
      </ul>
    </>
  );
};

export default HomePage;
