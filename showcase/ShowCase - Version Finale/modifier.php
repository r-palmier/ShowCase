<?php
header( 'content-type: text/html; charset=utf-8' );
$ID = $_POST['ID'];
$pseudo = $_POST["new_pseudo"];
$password = $_POST["new_mdp_user"];





// se connecte à la base de donnée
try
{
	$db = new PDO('mysql:host=localhost;dbname=showcase;charset=utf8', 'root', '');
}
catch (Exception $e)
{
        die('Erreur : ' . $e->getMessage());
}
$sqlQuery = 'UPDATE user SET pseudo = :pseudo, password = :password WHERE ID = :ID';

// enregistre les éléments dans la base de donnée
$insertmydb = $db->prepare($sqlQuery);

$insertmydb->execute([
    'pseudo' => $pseudo,
    'password' => $password,
    'ID' => $ID,

]);
?>
<html>
<head>
    <title>Enregistrement</title>
    <link rel="stylesheet" type="text/css"  href="./css/inscription.css">
</head>
    <body>
        <section class ="retour">
        <div class =" sous-titre "> Modification enregistrées ! </div>
        <form action="bienvenue.html" method="post">
            <div class="button">
                <button type="submit">Continuer</button>
            </div>
        </form>
        </section>
    </body>
</html>