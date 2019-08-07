# == Schema Information
#
# Table name: tracks
#
#  id          :bigint           not null, primary key
#  title       :string           not null
#  description :text
#  playlist_id :integer
#  uploader_id :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Track < ApplicationRecord 
    validates :title, presence: true
    validates :uploader_id, presence: true

    belongs_to :uploader,
    foreign_key: :uploader_id,
    class_name: :User

    has_one_attached :audio
    has_one_attached :image

    # def ensure_track
    #     unless self.audio.attached?
    #         errors[:audio] << "Must be attached"
    #     end
    # end
end
