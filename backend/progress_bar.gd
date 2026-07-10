extends ProgressBar

func _ready() -> void:
	# Dajemy silnikowi ułamek sekundy na załadowanie wszystkich obiektów 3D
	await get_tree().process_frame
	
	var player = get_tree().get_first_node_in_group("Player")
	if player:
		max_value = player.max_health
		value = player.current_health
	else:
		# Jeśli nadal nie widzi gracza, wypisz ostrzeżenie w konsoli
		print("Ostrzeżenie: Nie znaleziono gracza w grupie 'player'!")

func _on_player_player_health_changed(new_health: int) -> void:
	value = new_health
