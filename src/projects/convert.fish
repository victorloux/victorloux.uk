mkdir -p ../images/

for extension in jpg png gif
	for image in *.$extension
		set filename (basename $image .$extension)
		convert "$image" -resize 460x ../images/"$filename"_desktop.$extension
		convert "$image" -resize 920x -quality 65 ../images/"$filename"_desktop@2x.$extension
		convert "$image" -resize 240x ../images/"$filename"_mobile.$extension
		convert "$image" -resize 480x -quality 65 ../images/"$filename"_mobile@2x.$extension
	end
end