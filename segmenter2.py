
import wave
import librosa
import librosa.display
import matplotlib.pyplot as plt
import soundfile as sf
import numpy as np
from frequency_classifier import note_detect
import os

def process_audio_file(wavfile_name):
    # Load the audio file
    audio, sr = librosa.load(wavfile_name, sr=None, mono=True)

    # !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    # The output changes significanty when we change this number
    segment_duration = .5  # 0.5 seconds
    segment_duration_set = int(segment_duration * sr)

    # Calculate the total length of the audio in seconds
    total_duration = len(audio)

    # Initialize start and end times
    start_time = 0
    segment_count = 1

    return_str = ""

    while start_time < total_duration:
    
        end_time = start_time + segment_duration_set

        if end_time > total_duration:
            end_time = total_duration

        # Extract the segment
        segment = audio[start_time:end_time]

        if len(segment) == 0:
            print("No data in segment")
            break

        
        #print(f"Segment {segment_count} length:", len(segment))  # Debug: Print segment length
    
        file_name = f'segment_{segment_count}.wav'
        sf.write(file_name, segment, sr)

        #######################################################
        # THIS CODE IS FOR THE MACHINE LEARNING CLASSIFIER IF WE GET IT TO WORK
        # Calculate the Short-Time Fourier Transform (STFT)
        #stft = np.abs(librosa.stft(segment))

        # Convert the STFT to a spectrogram
        #spectrogram = librosa.amplitude_to_db(stft, ref=np.max)

        # Display the spectrogram using matplotlib
        #plt.figure(figsize=(10, 5))
        #librosa.display.specshow(spectrogram, sr=sr, x_axis='time', y_axis='linear')
        #plt.colorbar(format='%+2.0f dB')
        #plt.title(f'Spectrogram - Segment {segment_count}')
        #plt.xlabel('Time')
        #plt.ylabel('Frequency')
        #plt.tight_layout()
        #plt.show()
        ####################################################################

        segment_audio = wave.open(f'segment_{segment_count}.wav', 'rb')

        if len(segment) > 0:
            note = note_detect(segment_audio)
        else:
            print("no data in segment")
            break;
        segment_audio.close()

    
        
        # string output
        return_str += f"{note}, "

        # Update pointers for the next segment
        start_time = end_time
        end_time = min(end_time + segment_duration, total_duration)
        segment_count += 1
    return return_str

def main():
    notes = process_audio_file("a#0_98.wav")
    print(notes)
    return 0

if __name__ == "__main__":
    main()