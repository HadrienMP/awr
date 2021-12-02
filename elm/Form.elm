module Form exposing (..)

import Common.Mesures as Mesures exposing (Ligne(..))
import Common.Surface exposing (Surface)
import Elements.Essence exposing (Essence)
import Elements.Pietement exposing (Position)
import Elements.Table as Table exposing (Table)
import Elements.Type as Type exposing (TableType)


type alias Form =
    { type_ : Maybe TableType
    , essence : Maybe Essence
    , surface : Surface
    , pietement : Maybe Position
    }


toTable : Form -> Table
toTable form =
    let
        initial =
            Table.tableAManger
    in
    { type_ = form.type_ |> Maybe.withDefault initial.type_
    , essence = form.essence |> Maybe.withDefault initial.essence
    , surface = form.surface
    , pietement = form.pietement |> Maybe.withDefault initial.pietement
    }


withLongueur : Form -> Mesures.Ligne -> Form
withLongueur table longueur =
    let
        surface =
            table.surface

        updated =
            { surface | longueur = longueur }
    in
    { table | surface = updated }


withLargeur : Form -> Mesures.Ligne -> Form
withLargeur table largeur =
    let
        surface =
            table.surface

        updated =
            { surface | largeur = largeur }
    in
    { table | surface = updated }


withType : TableType -> Form -> Form
withType type_ table =
    case type_ of
        Type.Basse ->
            { type_ = Just type_
            , essence = table.essence
            , surface =
                { longueur = Centimetre 110
                , largeur = Centimetre 50
                }
            , pietement = table.pietement
            }

        Type.AManger ->
            { type_ = Just type_
            , essence = table.essence
            , surface =
                { longueur = Centimetre 140
                , largeur = Centimetre 70
                }
            , pietement = table.pietement
            }
