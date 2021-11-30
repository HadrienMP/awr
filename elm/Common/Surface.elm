module Common.Surface exposing (..)

import Common.Mesures as Mesures exposing (Ligne)


type alias Surface =
    { largeur : Ligne
    , longueur : Ligne
    }


m2 : Surface -> Float
m2 surface =
    Mesures.times surface.largeur surface.longueur
        |> Mesures.m2
