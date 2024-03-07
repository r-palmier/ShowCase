
<?php
header( 'content-type: text/html; charset=utf-8' );
// se connecte à la base de donnée
try
{
	$db = new PDO('mysql:host=localhost;dbname=showcase;charset=utf8', 'root', '');
}
catch (Exception $e)
{
        die('Erreur : ' . $e->getMessage());
}

$identifiant = $_POST["pseudo"];
$mdp = $_POST["mdp_user"];


$idsql = ('SELECT pseudo, password, ID FROM user WHERE pseudo = :pseudo');

$liste_id1 = $db->prepare($idsql);
$liste_id1 ->execute([
    'pseudo' => $identifiant,
]);

$liste_id = $liste_id1->fetchall();

// si les identifiants sont vide renvoi à l'acceuil 
if(empty($liste_id[0]['pseudo'])){?>
    <html>
        <meta http-equiv="refresh" content="0; url= bienvenue.html">
    </html>
<?php
}

//cherche le bon identifiant

$pseudo = $liste_id[0]['pseudo'];
$password = $liste_id[0]['password'];
$ID = $liste_id[0]['ID'];
$_POST[0]['ID'] = $ID;


if($identifiant == $pseudo && $mdp == $password ){
?>
<html>
<head>
    <title>Connexion</title>
    <link rel="stylesheet" type="text/css"  href="./css/connection.css">
</head>
<body>
    <section class="connecter">
    <div class ="sous-titre"> vous êtes connecté </div>
    <form action = "liste_site.php" method="post">
            <div>
                <label for="name"></label>
                <input type="hidden" id="name" name="pseudo" value = <?php echo($pseudo) ?>>
            </div>
            <div>
                <label for="password"></label>
                <input type="hidden" id="mdp_user" name="mdp_user" value = <?php echo($password) ?>>
            </div>
            <div>
                <label for="ID"></label>
                <input type="hidden" id="ID" name="ID" value = <?php echo($ID) ?>>
            </div>
            <div class="button">
                <button type="submit">liste de mes sites</button>
            </div>
    </form>
    </section>
    <section class="modifier">
    <div class="sous-titre"> Modifier mon profil </div>
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
            <div class="nom">
                <label for="new_name">nom :</label>
                <input type="text" id="new_name" name="new_pseudo">
            </div>
            <div class="mdp">
                <label for="new_password">mot de passe :</label>
                <input type="text" id="new_password" name="new_mdp_user">
            </div>
            <div class="button">
                <button type="submit">modifier</button>
            </div>
        </form>
    </section>
</body>
</html>
<?php
}
else{
?>
<html>
<meta http-equiv="refresh" content="0; url= bienvenue.html">
</html>
<?php
}
?>