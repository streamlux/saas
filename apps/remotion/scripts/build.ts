// Intended to be run with ts-node

import * as fse from 'fs-extra';

async function main() {
    console.log('Copying files...');

    await fse.emptyDir('dist/apps/remotion');
    await fse.ensureDir('dist/apps/remotion/app');
    await fse.ensureDir('dist/apps/remotion/environments');
    await fse.copy('apps/remotion/src/app', 'dist/apps/remotion/app');
    await fse.copy('libs/templates/src', 'dist/apps/remotion/app/components');
    await fse.copy('apps/remotion/src/environments/environment.prod.ts', 'dist/apps/remotion/environments/environment.ts');
    await fse.copy('apps/remotion/Dockerfile', 'dist/apps/remotion/Dockerfile');
    await fse.copy('apps/remotion/config/tsconfig.json', 'dist/apps/remotion/tsconfig.json');
    await fse.copy('apps/remotion/config/package.json', 'dist/apps/remotion/package.json');

    console.log('Done copying files.')
}

main();
