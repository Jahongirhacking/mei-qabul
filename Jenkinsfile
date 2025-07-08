pipeline {
    agent any
    
    stages {
        stage('qabul-kuaf-front update') {
            steps {
                sh 'ansible-playbook /var/lib/jenkins/ansible/qabul_kuaf-front.yml -l prod_9_46'
            }
        }
    }
}
