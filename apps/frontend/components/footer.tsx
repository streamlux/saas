import NextLink from 'next/link';
import { Center, Link } from '@chakra-ui/react';
import styles from './footer.module.css';
import packageJSON from '../../../package.json';
import React from 'react';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <Center>
                <ul className={styles.navItems}>
                    <li className={styles.navItem}>
                        <Link href="https://next-auth.js.org">Documentation</Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link href="https://www.npmjs.com/package/next-auth">NPM</Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link href="https://github.com/nextauthjs/next-auth-example">GitHub</Link>
                    </li>
                    <li className={styles.navItem}>
                        <NextLink href="/policy">
                            <Link>Policy</Link>
                        </NextLink>
                    </li>
                    <li className={styles.navItem}>
                        <em>next-auth@{packageJSON.dependencies['next-auth']}</em>
                    </li>
                    <li className={styles.navItem}>
                        <em>next@{packageJSON.dependencies['next']}</em>
                    </li>
                    <li className={styles.navItem}>
                        <em>{`react@${packageJSON.dependencies['react']}`}</em>
                    </li>
                    <li className={styles.navItem}>
                        <em>@chakra-ui/react@{packageJSON.dependencies['@chakra-ui/react']}</em>
                    </li>
                </ul>
            </Center>
        </footer>
    );
}
