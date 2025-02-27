import Link from 'next/link';
import NotFound from '@/components/Icons/NotFound';
import styles from './ErrorComponent.module.scss'

export default function ErrorComponent({ message }: { message: string }) {
return (
    <div className={styles.notFound}>
      <NotFound />
      <p>{message}</p>
        <Link href='/'>Ir a la pagina principal</Link>
    </div>
  );
}
