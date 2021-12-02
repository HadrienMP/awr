module Common.Surface exposing (..)

import Common.Mesures as Mesures exposing (Ligne)


type alias Surface =
    { largeur : Ligne
    , longueur : Ligne
    }


toString : Surface -> String
toString surface =
    ( surface.longueur, surface.largeur )
    |> Tuple.mapBoth Mesures.centimetres Mesures.centimetres
    |> Tuple.mapBoth String.fromInt String.fromInt
    |> \(longueur, largeur) -> longueur ++ " x " ++ largeur ++ " cm"


m2 : Surface -> Float
m2 surface =
    Mesures.times surface.largeur surface.longueur
        |> Mesures.m2
