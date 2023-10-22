
from frequency_classifier import note_detect
from pydub import AudioSegment
import wave
import struct

def process_audio_file(wavfile_name):
  # Load the audio file
  audio = AudioSegment.from_wav(wavfile_name)

  # Define the segment duration in milliseconds (e.g., 10 seconds)
  segment_duration = 0.5 * 1000  # 10 seconds

  # Calculate the total length of the audio in milliseconds
  total_duration = len(audio)

  # Initialize start and end pointers
  start_time = 0
  end_time = segment_duration

  segment_count = 1

  while start_time < total_duration:
      # Extract the segment
      segment = audio[start_time:end_time]

      # Save the segment to a new WAV file

      #segment.export(f'segment_{segment_count}.wav', format='wav')
      
      # have a async way of processing the file to make sure the classifer is done doing its job
      # call classifer here
      # add to a list of strings
      segment_audio = wave.open(f'segment_{segment_count}.wav', 'rb')
      note = note_detect(segment_audio)
      segment_audio.close()

      print(f'Segment {segment_count}: Detected Note - {note}')

      # Update pointers for the next segment
      start_time = end_time
      end_time = min(end_time + segment_duration, total_duration)
      segment_count += 1

def main():
   process_audio_file("d2.wav")
   return 0;

if __name__ == "__main__":
   main()