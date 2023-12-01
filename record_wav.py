import os
import sounddevice as sd
import numpy as np
import scipy.io.wavfile as wav

def record_audio(filename, duration, sample_rate):
    current_directory = os.getcwd()
    file_path = os.path.join(current_directory, filename)

    print("Recording...")

    # Start recording
    recording = sd.rec(int(duration * sample_rate), samplerate=sample_rate, channels=1)
    sd.wait()

    # Save the recorded audio to a WAV file
    wav.write(file_path, sample_rate, recording)

    print(f"Recording saved as {file_path}")

def main():
    file_name = input("Enter the name for the recording (include .wav extension): ")
    duration = float(input("Enter the duration of the recording (in seconds): "))
    sample_rate = 44100  # You can adjust this as needed (common values: 44100, 48000)

    record_audio(file_name, duration, sample_rate)

if __name__ == "__main__":
    main()
