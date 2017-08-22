'use strict'

const gulp          = require('gulp'),
      GulpSSH       = require('gulp-ssh'),
      FOLDER        = 'TelegramRecognizerBot',
      ENTRY_POINT   = 'index.js',
      DEPLOY_CONFIG = require('./deploy_config');

const gulpSSH = new GulpSSH({
  ignoreErrors: false,
  sshConfig: DEPLOY_CONFIG
});

// Deploy release on remote server via git
gulp.task('deploy', () => {
  return gulpSSH
    .shell([`cd ${FOLDER}`, 'git fetch --all', 'git reset --hard origin/master', 'npm install', `pm2 restart ${ENTRY_POINT}`]);
});

// Copy all files (excepting node_modules) from local environment to remote server
gulp.task('manual-deploy', () => {
  return gulp
    .src(['**', '!**/node_modules/**'])
    .pipe(gulpSSH.dest(FOLDER))
    .pipe(gulpSSH.shell([`cd ${FOLDER}`, 'npm install', `pm2 restart ${ENTRY_POINT}`]));
});

// Copy all files from local environment to remote server
gulp.task('full-deploy', () => {
  return gulp
    .src(['**'])
    .pipe(gulpSSH.dest(FOLDER))
    .pipe(gulpSSH.shell([`cd ${FOLDER}`, 'npm install', `pm2 restart ${ENTRY_POINT}`]));
});
