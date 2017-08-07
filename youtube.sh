#!/bin/sh
answer=""
tput clear
tput cup 05 10
echo "Give the YouTube URL: \c"
# Here you paste the YT-video-URL by ctrl+shift+V
read answer
# The follwing command will display a list of video quality options to choose from
youtube-dl -F $answer
echo
# Here you give the number shown in first column as per your choice
echo "Select Quality (Choose a number): \c"
read qual
# If you don't want to download and quit the shell, give 99
if [ $qual -ne 99 ]
then
youtube-dl -f $qual -o "/home/di/Videos/%(title)s.%(ext)s" $answer
else
exit 0
fi
