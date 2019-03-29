const createWindowsInstaller = require('electron-winstaller').createWindowsInstaller
const path = require('path')

getInstallerConfig()
  .then(createWindowsInstaller)
  .catch((error) => {
    console.error(error.message || error)
    process.exit(1)
  })

function getInstallerConfig () {
  const rootPath = path.join('./')
  const outPath = path.join(rootPath, '../release-builds')
  return Promise.resolve({
    skipUpdateIcon: true,
    loadingGif: path.join(rootPath, 'resources/icons/installer.gif'),
    noMsi: false,
    appDirectory: path.join(outPath, 'enciclopedia-animacion-win-win32-ia32/'),
    authors: 'MG08',
    outputDirectory: path.join(outPath, 'windows-installer'),
    exe: 'enciclopedia-animacion-win.exe',
    setupExe: 'EnciclopediaAnimacionInstaller.exe',
    setupMsi: 'EnciclopediaAnimacionInstaller.msi',
    setupIcon: path.join(rootPath, 'resources', 'icons', 'win', 'icon.ico')
  })
}
