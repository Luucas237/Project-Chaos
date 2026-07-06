extends CharacterBody3D

const SPEED = 5.0
const JUMP_VELOCITY = 4.5
const SENSITIVITY = 0.005

@onready var camera_pivot = $CameraPivot

# Zmienna do przechowywania animacji powrotu kamery
var camera_tween: Tween

func _ready():
	Input.set_mouse_mode(Input.MOUSE_MODE_CAPTURED)

func _input(event):
	# Obsługa ukrywania/pokazywania kursora (na klawisz ESC)
	if event.is_action_pressed("ui_cancel"):
		if Input.get_mouse_mode() == Input.MOUSE_MODE_CAPTURED:
			Input.set_mouse_mode(Input.MOUSE_MODE_VISIBLE)
		else:
			Input.set_mouse_mode(Input.MOUSE_MODE_CAPTURED)

	# Główna logika obrotu kamery i postaci
	if event is InputEventMouseMotion and Input.get_mouse_mode() == Input.MOUSE_MODE_CAPTURED:
		
		if Input.is_action_pressed("free_look"):
			# TRYB FREE LOOK: Obracamy tylko pivot kamery (lewo-prawo)
			camera_pivot.rotate_y(-event.relative.x * SENSITIVITY)
		else:
			# NORMALNY TRYB: Obracamy całą postać (lewo-prawo)
			rotate_y(-event.relative.x * SENSITIVITY)
			
		# Obrót góra-dół działa zawsze tak samo (na pivocie)
		camera_pivot.rotate_x(-event.relative.y * SENSITIVITY)
		# Blokada wychylenia kamery w pionie (od -90 do -30 stopni)
		camera_pivot.rotation.x = clamp(camera_pivot.rotation.x, deg_to_rad(-90), deg_to_rad(-30))

	# Reakcja na PUSZCZENIE scrolla (powrót kamery za plecy)
	if event.is_action_released("free_look"):
		# Jeśli kamera właśnie wracała, zatrzymujemy poprzednią animację
		if camera_tween:
			camera_tween.kill()
			
		# Tworzymy płynną animację (Tween), która resetuje obrót Y pivota do 0.0 w 0.2 sekundy
		camera_tween = create_tween()
		camera_tween.tween_property(camera_pivot, "rotation:y", 0.0, 0.2).set_trans(Tween.TRANS_SINE).set_ease(Tween.EASE_OUT)
		
	# Zatrzymanie powrotu kamery, jeśli gracz znów wciśnie scrolla zanim kamera zdąży wrócić
	if event.is_action_pressed("free_look"):
		if camera_tween:
			camera_tween.kill()

func _physics_process(delta):
	# Dodanie grawitacji
	if not is_on_floor():
		velocity += get_gravity() * delta

	# Skakanie
	if Input.is_action_just_pressed("jump") and is_on_floor():
		velocity.y = JUMP_VELOCITY

	# Poruszanie się na WASD
	var input_dir = Input.get_vector("move_left", "move_right", "move_forward", "move_backward")
	
	# Ruch odbywa się zawsze tam, gdzie "patrzy" ciało postaci (a nie wędrująca kamera)
	var direction = (transform.basis * Vector3(input_dir.x, 0, input_dir.y)).normalized()

	if direction:
		velocity.x = direction.x * SPEED
		velocity.z = direction.z * SPEED
	else:
		velocity.x = move_toward(velocity.x, 0, SPEED)
		velocity.z = move_toward(velocity.z, 0, SPEED)

	move_and_slide()
