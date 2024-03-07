
<?php
$pseudo = $_POST["pseudo"];
$password = $_POST["mdp_user"];





// se connecte à la base de donnée
try
{
	$db = new PDO('mysql:host=localhost;dbname=mydb;charset=utf8', 'root', '');
}
catch (Exception $e)
{
        die('Erreur : ' . $e->getMessage());
}

$sqlQuery = 'INSERT INTO user( pseudo, password) VALUES ( :pseudo, :password)';

// enregistre les éléments dans la base de donnée
$insertmydb = $db->prepare($sqlQuery);

$insertmydb->execute([
    'pseudo' => $pseudo,
    'password' => $password,

]);
?>
<html>
    <p> Enregistrement reussi </p>
        <form action="connecter.html" method="post">
            <div class="button">
                <button type="submit">se connecter</button>
            </div>
        </form>

</html>