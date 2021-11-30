module Elements.Table exposing (..)

import Common.Mesures as Mesures exposing (Ligne(..))
import Common.Prix as Prix exposing (Prix)
import Common.Surface as Surface exposing (Surface)
import Elements.Essence as Essence exposing (Essence(..))
import Elements.Pietement as Pietement exposing (Position)
import Elements.Type as Type exposing (TableType)


type alias Table =
    { type_ : TableType
    , essence : Essence
    , surface : Surface
    , pietement : Position
    }


prix : Table -> Prix
prix table =
    Essence.prix table.essence
        |> Prix.times (Surface.m2 table.surface)
        |> Prix.plus (Pietement.prix table.type_ table.pietement)
        |> Prix.round


tableAManger =
    { type_ = Type.AManger
    , essence = Chene
    , surface =
        { longueur = Centimetre 140
        , largeur = Centimetre 70
        }
    , pietement = Pietement.BoutDeTable
    }


withLongueur : Table -> Mesures.Ligne -> Table
withLongueur table longueur =
    let
        surface =
            table.surface

        updated =
            { surface | longueur = longueur }
    in
    { table | surface = updated }


withLargeur : Table -> Mesures.Ligne -> Table
withLargeur table largeur =
    let
        surface =
            table.surface

        updated =
            { surface | largeur = largeur }
    in
    { table | surface = updated }


withType : TableType -> Table -> Table
withType type_ table =
    case type_ of
        Type.Basse ->
            { type_ = type_
            , essence = table.essence
            , surface =
                { longueur = Centimetre 110
                , largeur = Centimetre 50
                }
            , pietement = table.pietement
            }

        Type.AManger ->
            { type_ = type_
            , essence = table.essence
            , surface =
                { longueur = Centimetre 140
                , largeur = Centimetre 70
                }
            , pietement = table.pietement
            }
