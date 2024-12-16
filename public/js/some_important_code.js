const modalBackground = this.add.rectangle(0, 0, slotGame.config.width, slotGame.config.height, 0x000000);
    modalBackground.setOrigin(0);
    // modalBackground.setDepth(1000)
    modalBackground.setVisible(false);

    const modalContent = this.add.container(slotGame.config.width / 2, slotGame.config.height / 2);
    modalContent.setVisible(false);
    modalBackground.setDepth(1000)
    // slotGame.scene.pause();

    // Add content to the modal container
    const popupText = this.add.text(0, 0, 'This is a popup message');
    modalContent.add(popupText);
    modalContent.setDepth(1001);

    // Function to show the popup
    this.showPopup = () => {
        modalBackground.setVisible(true);
        modalContent.setVisible(true);
        slotGame.scene.pause();
    }

    // Function to hide the popup
    this.hidePopup = () => {
        modalBackground.setVisible(false);
        modalContent.setVisible(false);
        slotGame.scene.resume();
    }

    // Input handling (simplified)
    this.input.on('pointerdown', (pointer) => {
      if (pointer.x >= modalContent.x && pointer.x <= modalContent.x + modalContent.width &&
          pointer.y >= modalContent.y && pointer.y <= modalContent.y + modalContent.height) {
          // Clicked on the modal content
          // Handle the click event, e.g., close the modal
          this.hidePopup();
      } else if (pointer.x >= modalBackground.x && pointer.x <= modalBackground.x + modalBackground.width &&
          pointer.y >= modalBackground.y && pointer.y <= modalBackground.y + modalBackground.height) {
          // Clicked outside the modal content
          // Close the modal
          this.hidePopup();
      }
    });






