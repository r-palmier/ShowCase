<?php
$ID = $_POST['ID'];
$pseudo = $_POST["new_pseudo"];
$password = $_POST["new_mdp_user"];





// se connecte à la base de donnée
try
{
	$db = new PDO('mysql:host=localhost;dbname=mydb;charset=utf8', 'root', '');
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
    <P> modification reussi </P>
</html>