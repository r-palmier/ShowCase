<?php
// se connecte à la base de donnée
try
{
	$db = new PDO('mysql:host=localhost;dbname=mydb;charset=utf8', 'root', '');
}
catch (Exception $e)
{
        die('Erreur : ' . $e->getMessage());
}

$identifiant = $_POST['pseudo'];
$mdp = $_POST['mdp_user'];


$idsql = ('SELECT pseudo, password, ID FROM user WHERE pseudo = :pseudo');

$liste_id1 = $db->prepare($idsql);
$liste_id1 ->execute([
    'pseudo' => $identifiant,
]);

$liste_id = $liste_id1->fetchall();

//cherche le bon identifiant

$pseudo = $liste_id[0]['pseudo'];
$password = $liste_id[0]['password'];
$ID = $liste_id[0]['ID'];
$_POST[0]['ID'] = $ID;


if($identifiant == $pseudo && $mdp == $password ){
?>
<html>
    <p> Vous êtes connectez </p>
    <p> MOdifier son profil </p>
    <form action="modifier.php" method="post">
            <div>
                <label for="name"></label>
                <input type="hidden" id="name" name="pseudo" value = <?php echo($pseudo) ?>>
            </div>
            <div>
                <label for="password"></label>
                <input type="hidden" id="password" name="password" value = <?php echo($password) ?>>
            </div>
            <div>
                <label for="ID"></label>
                <input type="hidden" id="ID" name="ID" value = <?php echo($ID) ?>>
            </div>
            <div>
                <label for="new_name">nom :</label>
                <input type="text" id="new_name" name="new_pseudo">
            </div>
            <div>
                <label for="new_password">mot de passe :</label>
                <input type="text" id="new_password" name="new_mdp_user">
            </div>
            <div class="button">
                <button type="submit">modifier</button>
            </div>
</html>
<?php
}
else{
?>
<html>
<meta http-equiv="refresh" content="0; url= connecter.html">
</html>
<?php
}
?>