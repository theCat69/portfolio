JENKINS_SCRIPTS = 'jenkins-scripts'

pipeline {
  agent any
  environment {
    PORTFOLIO_PATH = '/var/www/portfolio'
    BUILD_PATH = './dist'
  }
  stages {
    stage('Build') {
      steps {
        sh "npm run build.ci"
      }
    }
    stage('Deploy') {
      steps {
        script {
          if (env.GIT_BRANCH == "main") {
            echo "Deploying ..."
            sh "chmod -R 775 ${JENKINS_SCRIPTS}"
            sh "./${JENKINS_SCRIPTS}/deploy.sh"
            echo "Deploy success"
          } else {
            echo "No deployment for this build"
          }
        }

      }
    }
  }
}

