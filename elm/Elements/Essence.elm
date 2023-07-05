module Elements.Essence exposing (..)

import Common.ImageOptionField as ImageOptionField
import Common.Prix exposing (Prix(..))


type Essence
    = Chene
    | Chataignier
    | Frene
    | Noyer
    | Prestige
    | Exotique


toString : Essence -> String
toString essence =
    essenceField essence |> .labelString


all : List Essence
all =
    [ Chene, Chataignier, Frene, Noyer, Prestige, Exotique ]


prix : Essence -> Prix
prix essence =
    case essence of
        Chene ->
            Euros 1000

        Chataignier ->
            Euros 1000

        Frene ->
            Euros 950

        Noyer ->
            Euros 1050

        Prestige ->
            Euros 1100

        Exotique ->
            Euros 1050


fields : List (ImageOptionField.Model Essence)
fields =
    all
        |> List.map essenceField


essenceField : Essence -> ImageOptionField.Model Essence
essenceField essence =
    let
        ( fieldId, labelString, image ) =
            case essence of
                Chene ->
                    ( "chene", "Chêne", "/images/simulation/essences-img/chene.jpg" )

                Chataignier ->
                    ( "chataignier", "Châtaignier", "/images/simulation/essences-img/chataigner.jpg" )

                Frene ->
                    ( "frene", "Frêne", "/images/simulation/essences-img/frene.jpg" )

                Noyer ->
                    ( "noyer", "Noyer", "/images/simulation/essences-img/noyer.jpg" )

                Prestige ->
                    ( "prestige", "Prestige", "/images/simulation/essences-img/olivier.jpg" )

                Exotique ->
                    ( "exotique", "Exotique", "/images/simulation/essences-img/bubinga.jpg" )
    in
    ImageOptionField.Model fieldId labelString image essence
