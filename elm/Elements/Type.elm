module Elements.Type exposing (..)

import Common.ImageOptionField as ImageOptionField
import Common.Mesures exposing (Ligne(..), TaillesRanges)


type TableType
    = Basse
    | AManger


fields : List (ImageOptionField.Model TableType)
fields =
    [ AManger, Basse ] |> List.map tableTypeField


tableTypeField : TableType -> ImageOptionField.Model TableType
tableTypeField tableType =
    let
        ( fieldId, labelString, image ) =
            case tableType of
                Basse ->
                    ( "basse", "Table basse", "/images/simulation/table-basse.jpg" )

                AManger ->
                    ( "a-manger", "Table à manger", "/images/simulation/table-a-manger.jpg" )
    in
    ImageOptionField.Model fieldId labelString image tableType


tailles : TableType -> TaillesRanges
tailles tableType =
    case tableType of
        Basse ->
            { largeurs = { min = Centimetre 50, max = Centimetre 300 }
            , longueurs = { min = Centimetre 50, max = Centimetre 300 }
            }

        AManger ->
            { largeurs = { min = Centimetre 65, max = Centimetre 600 }
            , longueurs = { min = Centimetre 65, max = Centimetre 600 }
            }
