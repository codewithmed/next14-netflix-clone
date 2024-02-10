import BillBoard from "@/components/BillBoard"
import Navbar from "@/components/NavBar"
import useCurrentUser from "@/hooks/useCurrentUser"
import { NextPageContext } from "next"
import { signOut, getSession } from "next-auth/react"
import MovieList from "@/components/MovieList"
import useMovieList from "@/hooks/useMovieList"
import useFavorites from "@/hooks/useFavorites"
import InfoModal from "@/components/InfoModal"
import useInfoModalStore from "@/hooks/useInfoModalStore"

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }

}



export default function Home() {

  const { data: user } = useCurrentUser()
  const { data: movies } = useMovieList()
  const { data: favoriteMovies } = useFavorites()
  const { isOpen, closeModal } = useInfoModalStore()
  console.log(favoriteMovies)
  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <BillBoard />
      <div className="pb-40">
        <MovieList data={movies} title="Trending Now" />
        <MovieList data={favoriteMovies} title="My List" />
      </div>
    </>

  )
}
