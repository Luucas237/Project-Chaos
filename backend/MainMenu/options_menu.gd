extends Panel

@onready var resolution_select: OptionButton = $VBoxContainer/ResolutionSelect
@onready var master_slider: HSlider = $VBoxContainer/MasterSlider
@onready var fullscreen_check: CheckButton = $VBoxContainer/FullscreenCheck

func _ready() -> void:
	# Podpinamy sygnały systemowe pod nasze funkcje
	resolution_select.item_selected.connect(_on_resolution_selected)
	master_slider.value_changed.connect(_on_master_volume_changed)
	fullscreen_check.toggled.connect(_on_fullscreen_toggled)
	$VBoxContainer/BackButton.pressed.connect(_on_back_pressed)

# 1. Zmiana rozdzielczości
func _on_resolution_selected(index: int) -> void:
	match index:
		0: DisplayServer.window_set_size(Vector2i(1920, 1080))
		1: DisplayServer.window_set_size(Vector2i(1280, 720))
		2: DisplayServer.window_set_size(Vector2i(1024, 576))

# 2. Regulacja głośności (Master)
func _on_master_volume_changed(value: float) -> void:
	var bus_index = AudioServer.get_bus_index("Master")
	# Konwertujemy wartość suwaka (0.0 - 1.0) na decybele
	AudioServer.set_bus_volume_db(bus_index, linear_to_db(value))
	
	# Jeśli suwak jest na zero, całkowicie wyciszamy
	if value == 0:
		AudioServer.set_bus_mute(bus_index, true)
	else:
		AudioServer.set_bus_mute(bus_index, false)

# 3. Pełny ekran
func _on_fullscreen_toggled(toggled_on: bool) -> void:
	if toggled_on:
		DisplayServer.window_set_mode(DisplayServer.WINDOW_MODE_FULLSCREEN)
	else:
		DisplayServer.window_set_mode(DisplayServer.WINDOW_MODE_WINDOWED)

# 4. Powrót do menu głównego
func _on_back_pressed() -> void:
	hide() # Ukrywa panel opcji
