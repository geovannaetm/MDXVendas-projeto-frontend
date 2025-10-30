'use client'
import Link from "next/link"
import styles from './Header.module.css'
import { IoSearch } from 'react-icons/io5';
import { FaAngleDown } from 'react-icons/fa';
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from '../../firebase';

export default function Header() {
    const [user, setUser] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const auth = getAuth(app);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();

    }, [auth]);

    const handlelogout = async () => {
        await signOut(auth);
        setUser(null);
        window.location.href = '/';
    };


    return (
        <header className={styles.header}>
            {/*Logo */}
            <div className={styles.logo}>
                <Link href='/'>
                    <span className={styles.logo1}>M</span>
                    <span className={styles.logo2}>D</span>
                    <span className={styles.logo3}>X</span>
                </Link>
            </div>

            {/*Busca */}
            <div className={styles.searchBar}>
                <input type="text" placeholder='Buscar Apeartamento'></input>
                <div className={styles.location}>
                    <button className={styles.searchBtn}>
                        <IoSearch size={20} />
                    </button>
                </div>
            </div>

            {/*Menu */}
            <nav className={styles.navbar}>
                <ul>

                    {user ? (
                        <>

                            <li>
                                <Link href='/' className={styles.anuncio}>
                                    Meus Anúncios
                                </Link>
                            </li>

                            <li>
                                <Link href='/' className={styles.anunciarBtn}>
                                    Postar Anúncio
                                </Link>
                            </li>

                            <li className={styles.profileContainer}>
                                <button
                                    className={styles.profileBtn}
                                    onClick={() => setMenuOpen(!menuOpen)}
                                >
                                    <img
                                        src={user.photoURL}
                                        alt={user.displayName}
                                        className={styles.profileImg}
                                    />
                                    <span>{user.displayName?.split(' ')[0]}</span>
                                    <FaAngleDown size={16} className={styles.arrow} />

                                </button>

                                {menuOpen && (
                                    <div className={styles.dropdown}>
                                        <button>Minha Conta</button>
                                        <button>Favoritos</button>
                                        <button onClick={handlelogout}>Sair</button>
                                    </div>
                                )}

                            </li>

                        </>

                    ) : (

                        ///se não estiver logado
                        <>


                            <li>
                                <Link href='/signin' className={styles.loginBtn}>
                                    Entrar
                                </Link>
                            </li>
                            <li>
                                <Link href='/' className={styles.anunciarBtn}>
                                    Anunciar grátis
                                </Link>
                            </li>


                        </>
                    )}
                </ul>
            </nav>
        </header>
    )
}