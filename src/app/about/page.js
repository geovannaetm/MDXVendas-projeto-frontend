import './about.module.css'
import Link from 'next/link'

export default function About(){
  return (
    <div>
      <main>
        <h1>Página Sobre!</h1>
        <Link href='/'>Voltar</Link>
      </main>
    </div>
  )
}