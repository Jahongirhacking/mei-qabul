pipeline {
    agent any
    
    stages {
        stage('qabul-mpei-front update') {
            steps {
                sh 'ansible-playbook /var/lib/jenkins/ansible/qabul_mpei-front.yaml -l prod_9_46'
            }
        }
    }
}
