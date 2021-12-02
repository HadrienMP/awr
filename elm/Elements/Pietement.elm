module Elements.Pietement exposing (..)

import Common.ImageOptionField as ImageOptionField
import Common.Images as Images
import Common.Prix exposing (Prix(..))
import Elements.Type as Type


type Position
    = BoutDeTable
    | Central

toString: Position -> String
toString position =
    field position |> .labelString

prix : Type.TableType -> Position -> Prix
prix type_ position =
    case type_ of
        Type.Basse ->
            case position of
                BoutDeTable ->
                    Euros 180

                Central ->
                    Euros 250

        Type.AManger ->
            case position of
                BoutDeTable ->
                    Euros 250

                Central ->
                    Euros 500


fields =
    List.map field [ BoutDeTable, Central ]


field : Position -> ImageOptionField.Model Position
field position =
    case position of
        BoutDeTable ->
            { fieldId = "bout-de-table"
            , labelString = "En bout de table"
            , image = Images.boutDeTable
            , value = position
            }

        Central ->
            { fieldId = "central"
            , labelString = "Central"
            , image = Images.central
            , value = position
            }
