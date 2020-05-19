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