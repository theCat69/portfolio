JENKINS_SCRIPTS = 'jenkins-scripts'

pipeline {
  agent any
  environment {
    PORTFOLIO_PATH = '/home/portfolio/app'
    BIN_NAME = 'fvd_portfolio'
    BUILD_PATH = './target/release'
    STATIC_FILE = 'dist'
  }
  stages {
    stage('Build') {
      steps {
        script{
          if(env.GIT_BRANCH == "main") {
            sh "cargo make clean"
          }
          sh "cargo make release"
        }
      }
    }
    stage('Deploy') {
      steps {
        script {
          //TODO dont forget to change it back to main
          if (env.GIT_BRANCH == "main") {
            echo "Deploying ..."
            sh "chmod -R 775 ${JENKINS_SCRIPTS}"
            sh "./${JENKINS_SCRIPTS}/stop.sh"
            sh "./${JENKINS_SCRIPTS}/deploy.sh"
            sh "./${JENKINS_SCRIPTS}/start.sh"
            echo "Deploy success"
          } else {
            echo "No deployment for this build"
          }
        }

      }
    }
  }
}

