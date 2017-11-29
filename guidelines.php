<?php

$contextOptions = array(
    'ssl' => array(
        'verify_peer' => false,
        'verify_peer_name' => false
    )
);

$context = stream_context_create($contextOptions);

$GUIDE_ITEMS = array();

$GUIDE_URL ='https://docs.google.com/spreadsheets/d/1x3AKMHjB3rkFse9i8IIrh4VWKYA-X1mKWW2Tq9M43Pk/export?format=csv&id=1x3AKMHjB3rkFse9i8IIrh4VWKYA-X1mKWW2Tq9M43Pk&gid=175362859';

//$GUIDE_URL =' https://docs.google.com/a/unitn.it/spreadsheets/d/1MhMoM17qN7bZNZ1v0xMginvBi9pakR4NFISTp47f9xI/export?format=csv&id=1MhMoM17qN7bZNZ1v0xMginvBi9pakR4NFISTp47f9xI&gid=691960774'




/* Load guidelines from Google Spreadsheets */                                   
function load_csv(){     
    global $GUIDE_ITEMS, $GUIDE_URL, $context;                                                                                   

    // open file for reading
    $n = 0;
    $media = FALSE;
    
    if (($handle = fopen($GUIDE_URL, "r", TRUE, $context)) !== FALSE)
    {
        while (($row = fgetcsv($handle, 1000, ",")) !== FALSE)
        {
            if ($n > 0 && $row[0] != '') {            
            
                $pub = array(
                    "id" => $row[0],
                    "title" => $row[1],
                    "technology_1" => $row[2],
                    "technology_2" => $row[3],
                    "process" => $row[4],
                    "level_engagement" => $row[5],
                    "benefits" => $row[6],
                    "tech_name" => $row[7],
                    "designed_in" => $row[8],
                    "flag_design" => $row[9],
                    "tested_in" => $row[10],
                    "flag_evaluation" => $row[11],
                    "url" => $row[12],
                    "year" => $row[13],
                    "scale" => $row[14],
                );

                array_push($GUIDE_ITEMS, $pub);      
            }
            $n++;
        }
        fclose($handle);
    }
}

/* dump the array to json */
function to_json_guidelines(){
  global $GUIDE_ITEMS;
  $json = json_encode($GUIDE_ITEMS);
  print $json;
}

load_csv();
to_json_guidelines();

?>