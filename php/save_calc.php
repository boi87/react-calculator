<?php
header("Access-Control-Allow-Origin: *");
header('Content-type: application/json');

$result = $_POST['result'];
$ip = $_POST['ipFromJs'];

$date = date("d/m/Y");
$browser = getBrowser($_SERVER['HTTP_USER_AGENT']);

$fp = fopen('file.csv', 'a');
fputcsv($fp, array($date, $ip, $browser, $result));
fclose($fp);
print('ok');

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
