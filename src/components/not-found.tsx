import { HiOutlineFaceFrown } from 'react-icons/hi2';
import { useMainContext } from '@/contexts/main-context';
import Loader from './loader';

export default function NotFound() {
  const { search, apps } = useMainContext();
  
  return (
    <>
      {apps.length === 0 ? (
        <div className="text-center">
          <Loader />
        </div>
      ) : (
        <div className="text-center">
          <HiOutlineFaceFrown className="size-9 inline mb-2" />
          <p>Nenhum app encontrado para &quot;{search}&quot;.</p>
        </div>
      )}
    </>
  )
}