<#-- executeActions.ftl -->
<#setting url_escaping_charset='UTF-8'>
<html>
<body>
    <p>Olá, ${user.firstName!"Usuário"},</p>
    <p>Clique no link abaixo para ativar sua conta:</p>
    
    <a href="http://localhost:3000/local/auth/validate-email?keycloak_link=${link?url('UTF-8')}">
        Confirmar Minha Conta
    </a>
</body>
</html>