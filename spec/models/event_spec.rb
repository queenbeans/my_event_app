require 'rails_helper'

# I reached for RSpec as I'm most familiar / comfortable with it. Also the Should matcher library for simplifying assertions against your subject. It makes te
RSpec.describe Event, type: :model do
  describe 'validations' do
    it { should validate_presence_of :title }
    it { should validate_presence_of :start_time }
    it { should validate_presence_of :end_time }

    it 'raises error if end time is not greater than start time' do
      freeze_time do
        now = Time.current
        # creating event this way rather than mocking using let to freeze time since let is lazily evaluated
        event = Event.new(
          start_time: now,
          end_time: 1.minute.ago
        )
        
        expect(event).not_to be_valid
        expect(event.errors[:end_time]).to include(/must be greater than/)
      end
    end
  end
end
