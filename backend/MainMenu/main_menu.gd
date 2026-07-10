extends Control

# Ścieżki do innych scen (zmień na własne, gdy je stworzysz)
const SINGLEPLAYER_SCENE = "res://frontend/World/World.tscn"
const MULTIPLAYER_MENU_SCENE = "res://scenes/multiplayer_menu.tscn"
const OPTIONS_SCENE = "res://scenes/options_menu.tscn"


func _on_button_multi_pressed() -> void:
	# Przejście do lobby multiplayer
	get_tree().change_scene_to_file(MULTIPLAYER_MENU_SCENE)

func _on_ButtonOptions_pressed() -> void:
	# Pokazuje ukryty panel opcji
	$OptionsMenu.show()

func _on_button_exit_pressed() -> void:
	# Zamknięcie gry
	get_tree().quit()

func _on_button_options_pressed() -> void:
	$OptionsMenu.show() # Replace with function body.


func _on_button_single_pressed() -> void:
	get_tree().change_scene_to_file(SINGLEPLAYER_SCENE)
