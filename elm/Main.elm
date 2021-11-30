module Main exposing (..)

import Browser
import Elements.Essence as Essence exposing (Essence(..))
import Html exposing (Html, a, div, h2, input, label, p, text)
import Html.Attributes exposing (class, for, href, id, step, type_, value)
import Html.Events exposing (onInput)
import Common.ImageOptionField as ImageOptionField
import Elements.Pietement as Pietement exposing (Position)
import Common.Prix as Prix exposing (Prix(..))
import Common.Surface exposing (Surface)
import Elements.Table as Table exposing (Table)
import Common.Mesures exposing (Ligne(..), TaillesRanges, centimetres, fromCentimetres)
import Elements.Type as Type exposing (TableType, tailles)



-- MAIN


main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }



-- MODEL


init : () -> ( Table, Cmd Msg )
init _ =
    ( Table.tableAManger, Cmd.none )



-- UPDATE


type Msg
    = LongueurChanged String
    | LargeurChanged String
    | TableTypeChanged TableType
    | EssenceChanged Essence
    | PositionPietementChanged Position


update : Msg -> Table -> ( Table, Cmd Msg )
update msg table =
    case msg of
        LongueurChanged centimetres ->
            ( fromCentimetres centimetres |> Maybe.withDefault table.surface.longueur |> Table.withLongueur table
            , Cmd.none
            )

        LargeurChanged centimetres ->
            ( fromCentimetres centimetres |> Maybe.withDefault table.surface.largeur |> Table.withLargeur table
            , Cmd.none
            )

        TableTypeChanged tableType ->
            ( Table.withType tableType table, Cmd.none )

        EssenceChanged essence ->
            ( { table | essence = essence }, Cmd.none )

        PositionPietementChanged positionPietement ->
            ( { table | pietement = positionPietement }, Cmd.none )



-- VIEW


view : Table -> Html Msg
view table =
    div [ id "simulation-columns" ]
        [ div [ id "fields" ]
            ([ h2 [] [ text "Type" ]
             , div [ class "radio-field" ]
                (ImageOptionField.display
                    { current = table.type_, onChange = TableTypeChanged }
                    Type.fields
                )
             , h2 [] [ text "Essence de bois" ]
             , div [ class "radio-field essence" ]
                (ImageOptionField.display
                    { current = table.essence, onChange = EssenceChanged }
                    Essence.essencesFields
                )
             , h2 [] [ text "Taille du plateau" ]
             ]
                ++ (tailles table.type_ |> surfaceFields table.surface)
                ++ [ h2 [] [ text "Piétement" ]
                   , div [ class "radio-field" ]
                        (ImageOptionField.display
                            { current = table.pietement, onChange = PositionPietementChanged }
                            Pietement.fields
                        )
                   ]
            )
        , div
            [ id "result" ]
            [ h2 [] [ text "Estimation" ]
            , p [ class "estimate" ] [ Table.prix table |> Prix.print |> text ]
            , p [] [ text "D'autres options sont disponibles." ]
            , p []
                [ text "Pour concevoir votre projet entièrement sur mesure et recevoir votre devis, "
                , a [ href "mailto:tom@woodriver.fr" ] [ text "contactez-moi par mail." ]
                ]
            ]
        ]


surfaceFields : Surface -> TaillesRanges -> List (Html Msg)
surfaceFields surface { largeurs, longueurs } =
    [ div [ class "range-field" ]
        [ label [ for "longueur" ] [ text <| "Longueur: " ++ (centimetres surface.longueur |> String.fromInt) ++ " cm" ]
        , input
            [ id "longueur"
            , type_ "range"
            , longueurs.min |> centimetres |> String.fromInt |> Html.Attributes.min
            , longueurs.max |> centimetres |> String.fromInt |> Html.Attributes.max
            , step "5"
            , value (centimetres surface.longueur |> String.fromInt)
            , onInput LongueurChanged
            ]
            []
        ]
    , div [ class "range-field" ]
        [ label [ for "largeur" ] [ text <| "Largeur: " ++ (centimetres surface.largeur |> String.fromInt) ++ " cm" ]
        , input
            [ id "largeur"
            , type_ "range"
            , largeurs.min |> centimetres |> String.fromInt |> Html.Attributes.min
            , largeurs.max |> centimetres |> String.fromInt |> Html.Attributes.max
            , step "5"
            , value (centimetres surface.largeur |> String.fromInt)
            , onInput LargeurChanged
            ]
            []
        ]
    ]



-- SUBSCRIPTIONS


subscriptions : Table -> Sub Msg
subscriptions _ =
    Sub.none
