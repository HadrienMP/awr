module Common.ImageOptionField exposing (..)

import Html exposing (Html, i, img, input, label, p, text)
import Html.Attributes exposing (alt, checked, class, classList, for, id, name, src, type_, value)
import Html.Events exposing (onCheck)


type alias Model option =
    { fieldId : String
    , labelString : String
    , image : String
    , value : option
    }


type alias Toto option msg =
    { current : Maybe option
    , onChange : option -> msg
    }


display : Toto option msg -> List (Model option) -> List (Html msg)
display toto fields =
    fields |> List.map (displayOne toto)


displayOne : Toto option msg -> Model option -> Html msg
displayOne { current, onChange } { fieldId, value, labelString, image } =
    let
        selected =
            current |> Maybe.map ((==) value) |> Maybe.withDefault False
    in
    label
        [ for fieldId ]
        [ p [ class "image-title", classList [ ( "selected", selected ) ] ] [ text labelString ]
        , img [ alt labelString, src image ] []
        , i [ class "fas fa-check-circle", classList [ ( "show", selected ) ] ] []
        , input
            [ type_ "radio"
            , id fieldId
            , name "essence"
            , checked selected
            , Html.Attributes.value fieldId
            , onCheck (\_ -> onChange value)
            ]
            []
        ]
