import { HiOutlineFaceFrown } from 'react-icons/hi2';

type Props = {
  search: string;
}

export default function NotFound({ search }: Props) {
  return (
    <div className="text-center">
      <HiOutlineFaceFrown className="size-9 inline mb-2" />
      <p>Nenhum app encontrado para &quot;{search}&quot;.</p>
    </div>
  )
}