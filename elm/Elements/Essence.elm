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


all : List Essence
all =
    [ Chene, Chataignier, Frene, Noyer, Prestige, Exotique ]


prix : Essence -> Prix
prix essence =
    case essence of
        Chene ->
            Euros 900

        Chataignier ->
            Euros 900

        Frene ->
            Euros 850

        Noyer ->
            Euros 950

        Prestige ->
            Euros 1000

        Exotique ->
            Euros 900


essencesFields : List (ImageOptionField.Model Essence)
essencesFields =
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
