import styles from './styles.module.scss';
import { Hero } from '@/components/hero';
import { getItemBySlug } from '@/utils/actions/get-data'; 
import { Phone } from 'lucide-react';
import { Container } from '@/components/container';
import Image from 'next/image';
import { Metadata } from 'next';

interface PostParams {
  slug: string;
}

const defaultMetadata: Metadata = {
  title: "DevMotors - Sua oficina especializada!",
  description: "Oficina de carros em São Paulo",
};

export async function generateMetadata({ params }: { params: PostParams }): Promise<Metadata> {
  try {
    const data = await getItemBySlug(params.slug);
    
    if (!data?.objects?.length) {
      return defaultMetadata;
    }

    const post = data.objects[0];
    
    return {
      title: `DevMotors - ${post.title}`,
      description: post.metadata.description.text,
      keywords: ["devmotors", "troca de oleo", "devmotors troca de oleo"],
      openGraph: {
        title: `DevMotors - ${post.title}`,
        images: post.metadata.banner.url ? [post.metadata.banner.url] : [],
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return defaultMetadata;
  }
}

export default async function PostPage({ params }: { params: PostParams }) {
  let data;
  
  try {
    data = await getItemBySlug(params.slug);
  } catch (error) {
    console.error('Error fetching post:', error);
    return <div className={styles.error}>Erro ao carregar o post</div>;
  }

  if (!data?.objects?.length) {
    return <div className={styles.notFound}>Post não encontrado</div>;
  }

  const post = data.objects[0];

  return (
    <>
      <Hero
        heading={post.title}
        buttonTitle={post.metadata.button.title}
        buttonUrl={post.metadata.button.url}
        bannerUrl={post.metadata.banner.url}
        icon={<Phone size={24} color="#FFF" />}
      />

      <Container>
        <section className={styles.about}>
          <article className={styles.innerAbout}>
            <h1 className={styles.title}>
              {post.metadata.description.title}
            </h1>
            <p>
              {post.metadata.description.text}
            </p>

            {post.metadata.description.button_active && (
              <a
                href={post.metadata.description.button_url as string}
                target='_blank'
                rel="noopener noreferrer"
                className={styles.link}
              >
                {post.metadata.description.button_title}
              </a>
            )}
          </article>

          <div className={styles.bannerAbout}>
            <Image
              className={styles.imageAbout}
              alt={post.title}
              quality={100}
              fill
              priority
              src={post.metadata.description.banner.url}
              sizes="(max-width: 480px) 100vw, (max-width: 1024px) 75vw, 60vw"
            />
          </div>
        </section>
      </Container>
    </>
  );
}