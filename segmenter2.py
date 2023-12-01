
import wave
import librosa
import soundfile as sf
import numpy as np
from frequency_classifier import note_detect  # Assuming note_detect function is implemented elsewhere
import os

def process_audio_file(wavfile_name):
    audio, sr = librosa.load(wavfile_name, sr=None, mono=True)
    segment_duration = 0.5  # 0.5 seconds
    segment_duration_samples = int(segment_duration * sr)
    total_duration = len(audio)

    start_time = 0
    segment_count = 1
    notes_list = []

    while start_time < total_duration:
        end_time = start_time + segment_duration_samples
        if end_time > total_duration:
            end_time = total_duration

        segment = audio[start_time:end_time]

        if len(segment) == 0:
            print("No data in segment")
            break

        file_name = f'segment_{segment_count}.wav'
        sf.write(file_name, segment, sr)

        segment_audio = wave.open(f'segment_{segment_count}.wav', 'rb')
        if len(segment) > 0:
            note = note_detect(segment_audio)
        else:
            print("No data in segment")
            break
        segment_audio.close()

        if len(notes_list) == 0 or len(notes_list[-1]) == 4:
            notes_list.append([note])
        else:
            notes_list[-1].append(note)

        start_time = end_time
        end_time = min(end_time + segment_duration_samples, total_duration)
        segment_count += 1

    formatted_notes = []
    for notes in notes_list:
        if len(notes) == 4:
            #notes.extend([''] * (4 - len(notes)))

            formatted_notes.append('(' + ', '.join([note + "/q" if idx == 0 else note for idx, note in enumerate(notes)]) + ')')
            
    return formatted_notes

def main():
    notes = process_audio_file("open_guitar_strings.wav")
    formatted_notes = [note.replace("'", "") for note in notes]  # Remove quotation marks from each string
    print(formatted_notes)
    

    #for note1 in formatted_notes:
    #    print(note1)
    
    return 0

if __name__ == "__main__":
    main()