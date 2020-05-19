<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    header("Access-Control-Allow-Origin: *");
    header('Content-type: application/json');

    $result = $_POST['result'];
    // $ip = $_POST['ipFromJs'];
    $ip = file_get_contents('https://api.ipify.org?format=jsonp?callback=?');

    $date = date("d/m/Y");
    $browser = getBrowser($_SERVER['HTTP_USER_AGENT']);

    $fp = fopen('file.csv', 'a');
    fputcsv($fp, array($date, $ip, $browser, $result));
    fclose($fp);
    print('ok');
} else {
?>
    <html>

    <head>
        <style>
            table {
                border: 2px solid #5c744d;
                width: 30rem;
                text-align: center;
                font-family: monospace;
            }

            h1 {
                text-align: left;
                font-family: monospace;
            }
        </style>
    </head>

    <body>
        <h1> Stored Results </h1>
        <table>
            <tr>
                <th>Date</th>
                <th>IP address</th>
                <th>Browser</th>
                <th>Result</th>
            </tr>
            <?php
            $arr = array();
            $row = 0;

            $fp = fopen("file.csv", "r");
            while (($data = fgetcsv($fp, 1000, ",")) !== FALSE) {
                $num = count($data);
                for ($i = 0; $i < $num; $i++) {
                    $arr[$row][$i] = $data[$i];
                }
                $row++;
            }
            fclose($fp);

            for ($i = count($arr) - 1; $i >= 0; $i--) {
                echo "<tr>";
                foreach ($arr[$i] as $value) {
                    echo "<td>$value</td>";
                }
                echo "</tr>";
            }
            ?>
        </table>
    </body>

    </html>
<?php
}

function getBrowser($agent)
{

    switch (TRUE) {
        case preg_match('/MSIE/i', $agent) && !preg_match('/Opera/i', $agent):
            $browserName = 'Internet Explorer';
            break;
        case preg_match('/Firefox/i', $agent):
            $browserName = 'Mozilla Firefox';
            break;
        case preg_match('/OPR/i', $agent):
            $browserName = 'Opera';
            break;
        case preg_match('/Chrome/i', $agent) && !preg_match('/Edge/i', $agent):
            $browserName = 'Google Chrome';
            break;
        case preg_match('/Safari/i', $agent) && !preg_match('/Edge/i', $agent):
            $browserName = 'Apple Safari';
            break;
        case preg_match('/Netscape/i', $agent):
            $browserName = 'Netscape';
            break;
        case preg_match('/Edge/i', $agent):
            $browserName = 'Microsoft Edge';
            break;
        case preg_match('/Trident/i', $agent):
            $browserName = 'Internet Explorer';
            break;
        default:
            $browserName = 'Others';
    }
    return $browserName;
}
